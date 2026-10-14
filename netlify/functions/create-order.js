import { createClient } from '@supabase/supabase-js';
import nodemailer from 'nodemailer';

// ── Pomocné funkcie ──────────────────────────────────────────────
function sanitize(str) {
  if (typeof str !== 'string') return '';
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#x27;')
    .trim()
    .slice(0, 500);
}

function isValidEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function isValidPrice(num) {
  return typeof num === 'number' && isFinite(num) && num >= 0 && num <= 99999;
}

const IBAN_DISPLAY = 'SK48 0900 0000 0052 4269 0350';
const RECIPIENT_NAME = 'Štefan Hupčík';

// Ceny a názvy musia sedieť so src/components/shop/shopOptions.ts
const ADAPTERS = {
  'iphone-20w': { name: 'Nabíjací adaptér 20W (USB-C Power Adapter)', price: 15 },
  'android-10w': { name: 'Nabíjací adaptér 10W (USB-A Power Adapter)', price: 10 },
};

const SHIPPING_METHODS = {
  posta: { name: 'Slovenská pošta – doručenie na adresu', price: 0, payment: 'bank_transfer' },
  osobny: { name: 'Osobný odber – Fixanto, Dolná Súča 877', price: 0, payment: 'cash_on_pickup' },
};

const PICKUP_ADDRESS = 'Fixanto, Dolná Súča 877, 913 32 Dolná Súča';
const PICKUP_HOURS = 'Po – Pi: 9:00 – 18:00, So: 10:00 – 14:00';
const SHOP_PHONE = '0949 344 600';

// ── Handler ──────────────────────────────────────────────────────
export const handler = async (event) => {
  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, body: 'Method Not Allowed' };
  }

  const bodySize = Buffer.byteLength(event.body || '', 'utf8');
  if (bodySize > 50000) {
    return { statusCode: 413, body: 'Request too large' };
  }

  let body;
  try {
    body = JSON.parse(event.body);
  } catch {
    return { statusCode: 400, body: 'Invalid JSON' };
  }

  const {
    customerName, customerEmail, customerPhone,
    customerStreet, customerCity, customerZip,
    shippingMethodId,
    items, totalPrice,
    discountCode,
    adapters, adapterAdded, notes,
  } = body;

  // Spôsob doručenia a platby určuje server (nie prehliadač)
  const shippingId = shippingMethodId || 'posta';
  const shipping = SHIPPING_METHODS[shippingId];
  if (!shipping) {
    return { statusCode: 400, body: 'Invalid shipping method' };
  }
  const isPickup = shipping.payment === 'cash_on_pickup';

  // Adaptéry – len známe ID, bez duplicít (adapterAdded = spätná kompatibilita)
  const adapterIds = Array.isArray(adapters)
    ? [...new Set(adapters)].filter((id) => ADAPTERS[id])
    : (adapterAdded ? ['iphone-20w'] : []);
  const chosenAdapters = adapterIds.map((id) => ADAPTERS[id]);

  // ── Validácia ────────────────────────────────────────────────
  if (!customerName || !customerEmail || !customerPhone || !items) {
    return { statusCode: 400, body: 'Missing required fields' };
  }

  // Adresa je povinná len pri doručení – pri osobnom odbere sa neukladá (GDPR: len potrebné údaje)
  if (!isPickup && (!customerStreet || !customerCity || !customerZip)) {
    return { statusCode: 400, body: 'Missing address' };
  }
  const street = isPickup ? null : sanitize(customerStreet);
  const city = isPickup ? null : sanitize(customerCity);
  const zip = isPickup ? null : sanitize(customerZip);

  if (!isValidEmail(customerEmail)) {
    return { statusCode: 400, body: 'Invalid email' };
  }

  if (String(customerPhone).replace(/\s/g, '').length < 9) {
    return { statusCode: 400, body: 'Invalid phone' };
  }

  // Suma, ktorú videl zákazník – server ju porovná s cenou vypočítanou z databázy
  if (!isValidPrice(Number(totalPrice))) {
    return { statusCode: 400, body: 'Invalid price' };
  }

  // Z prehliadača berieme LEN identifikátory telefónov (slug), nie ceny ani názvy
  if (!Array.isArray(items) || items.length === 0 || items.length > 20) {
    return { statusCode: 400, body: 'Invalid items' };
  }
  const slugs = [...new Set(items.map((i) => (typeof i?.slug === 'string' ? i.slug.trim() : '')))];
  if (slugs.some((sl) => !/^[a-z0-9-]{1,120}$/i.test(sl))) {
    return { statusCode: 400, body: 'Invalid item data' };
  }

  const dangerousPattern = /(<script|javascript:|onerror=|DROP\s|DELETE\s|INSERT\s|UPDATE\s|SELECT\s|;--|\/\*)/gi;
  const allInputs = [customerName, customerEmail, customerPhone, customerStreet || '', customerCity || '', customerZip || '', notes || ''].join(' ');
  if (dangerousPattern.test(allInputs)) {
    return { statusCode: 400, body: 'Invalid characters in input' };
  }

  if (customerName.length > 100 || (customerStreet || '').length > 200 || (notes || '').length > 500) {
    return { statusCode: 400, body: 'Input too long' };
  }

  // ── Supabase ──────────────────────────────────────────────────
  const supabase = createClient(
    process.env.SUPABASE_URL,
    process.env.SUPABASE_SERVICE_ROLE_KEY,
    { auth: { persistSession: false } }
  );

  const json = (statusCode, data) => ({
    statusCode,
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });

  // ── Objednávka = JEDNA transakcia v databáze (funkcia place_order) ──
  // Zamkne telefóny, overí dostupnosť, vypočíta ceny z DB, overí zľavu,
  // uloží objednávku + položky + rezerváciu. Ak niečo zlyhá, neuloží sa nič.
  // Číslo objednávky = variabilný symbol → max 10 číslic (limit bánk v SR).
  let orderId;
  let result;
  for (let attempt = 0; attempt < 5; attempt++) {
    orderId = String(Math.floor(Date.now() / 1000) + attempt);
    const { data, error } = await supabase.rpc('place_order', {
      p_order_number: orderId,
      p_customer: {
        name: sanitize(customerName),
        email: sanitize(customerEmail),
        phone: sanitize(customerPhone),
        street: street || '',
        city: city || '',
        zip: zip || '',
        notes: notes ? sanitize(notes) : '',
      },
      p_shipping: { name: shipping.name, price: shipping.price, payment: shipping.payment },
      p_slugs: slugs,
      p_adapters: chosenAdapters.map((a) => ({ name: a.name, price: a.price })),
      p_discount_code: discountCode ? String(discountCode).slice(0, 50) : null,
      p_expected_total: Number(totalPrice),
    });

    if (error && error.code === '23505') continue; // rovnaké číslo objednávky v tej istej sekunde → skús ďalšie
    if (error) {
      console.error('place_order error:', error);
      return json(500, { success: false, error: 'Nastala chyba pri spracovaní objednávky. Skúste to prosím znova.' });
    }
    result = data;
    break;
  }

  if (!result) {
    return json(503, { success: false, error: 'Systém je momentálne preťažený. Skúste to prosím o chvíľu znova.' });
  }

  if (!result.ok) {
    if (result.code === 'unavailable') {
      const names = (result.names || []).map((n) => sanitize(String(n))).join(', ') || 'Telefón';
      return json(409, {
        success: false,
        code: 'unavailable',
        unavailable: result.slugs || [],
        error: `Ľutujeme, ${names} si medzitým objednal iný zákazník a už nie je dostupný. Odstránili sme ho z košíka.`,
      });
    }
    if (result.code === 'invalid_discount') {
      return json(409, {
        success: false,
        code: 'invalid_discount',
        error: 'Zľavový kód už nie je platný. Odstráňte ho prosím a odošlite objednávku znova.',
      });
    }
    if (result.code === 'price_changed') {
      return json(409, {
        success: false,
        code: 'price_changed',
        error: 'Cena v košíku sa medzičasom zmenila. Obnovte prosím stránku a skontrolujte sumu.',
      });
    }
    return json(400, { success: false, error: 'Objednávku sa nepodarilo vytvoriť.' });
  }

  // Od tohto bodu sú všetky ceny a názvy z databázy
  const dbItems = result.items || [];
  const subtotal = Number(result.subtotal);
  const totalFromDb = Number(result.total);
  const shippingPrice = Number(result.shipping_price);
  const discountPercent = Number(result.discount_percent) || 0;
  const discountAmount = Number(result.discount_amount) || 0;
  const appliedCode = result.discount_code || null;

  try {
    // 4. Odošli email
    try {
      const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: process.env.GMAIL_USER,
          pass: process.env.GMAIL_APP_PASSWORD,
        },
      });

      const safeProducts = dbItems.map(p => ({
        name: sanitize(p.name),
        capacity: sanitize(p.capacity || ''),
        color: sanitize(p.color || ''),
        price: Number(p.price).toFixed(2),
      }));

      for (const a of chosenAdapters) {
        safeProducts.push({ name: a.name, capacity: '', color: '', price: a.price.toFixed(2) });
      }

      const productListHtml = safeProducts.map(p => `
        <tr>
          <td style="padding:8px;border-bottom:1px solid #eee;">${p.name}${p.capacity ? ' ' + p.capacity : ''}${p.color ? ' – ' + p.color : ''}</td>
          <td style="padding:8px;border-bottom:1px solid #eee;text-align:right;font-weight:bold;">€${p.price}</td>
        </tr>`).join('');

      const productListText = safeProducts
        .map(p => `  • ${p.name}${p.capacity ? ' ' + p.capacity : ''}${p.color ? ' – ' + p.color : ''}: €${p.price}`)
        .join('\n');

      const safeSubtotal = subtotal.toFixed(2);
      const safeShipping = shippingPrice.toFixed(2);
      const safeTotal = totalFromDb.toFixed(2);
      const safeDiscount = discountAmount.toFixed(2);
      const safeDiscountCode = appliedCode ? sanitize(String(appliedCode)) : null;
      const safeDiscountPercent = discountPercent;

      const discountHtmlBlock = safeDiscountCode ? `
        <div style="background:#e8f5e9;border:2px solid #4caf50;border-radius:10px;padding:15px;margin:16px 0;">
          <p style="margin:0;color:#2e7d32;font-weight:bold;">🎉 Zľavový kód: ${safeDiscountCode} (-${safeDiscountPercent}%)</p>
          <p style="margin:4px 0 0;color:#2e7d32;font-size:14px;">Ušetrili ste: €${safeDiscount}</p>
        </div>` : '';

      const discountRowHtml = safeDiscountCode
        ? `<p style="margin:4px 0;color:#4caf50;font-weight:bold;">Zľava (${safeDiscountCode} -${safeDiscountPercent}%): -€${safeDiscount}</p>`
        : '';

      const discountTextLine = safeDiscountCode
        ? `Zľava (${safeDiscountCode} -${safeDiscountPercent}%): -€${safeDiscount}\n`
        : '';

      const introText = isPickup
        ? 'Ďakujeme za vašu objednávku! Telefón pre vás rezervujeme na <strong>48 hodín</strong> – <strong>nič neplatíte vopred</strong>, zaplatíte až pri prevzatí.'
        : 'Ďakujeme za vašu objednávku! Prosíme o úhradu prevodom <strong>do 48 hodín</strong>.';

      const pickupBlockHtml = `
      <div style="background:#e8f5e9;border:2px solid #4caf50;border-radius:10px;padding:24px;margin:24px 0;">
        <h2 style="color:#1b5e20;margin:0 0 16px;">🏪 Osobný odber</h2>
        <table style="width:100%;border-collapse:collapse;">
          <tr><td style="color:#555;padding:6px 0;width:160px;"><strong>Adresa:</strong></td><td style="color:#1b5e20;font-weight:bold;">${PICKUP_ADDRESS}</td></tr>
          <tr><td style="color:#555;padding:6px 0;"><strong>Otváracie hodiny:</strong></td><td style="color:#1b5e20;font-weight:bold;">${PICKUP_HOURS}</td></tr>
          <tr><td style="color:#555;padding:6px 0;"><strong>Platba:</strong></td><td style="color:#1b5e20;font-weight:bold;">pri prevzatí</td></tr>
          <tr><td style="color:#555;padding:6px 0;"><strong>Suma:</strong></td><td style="color:#1b5e20;font-weight:bold;font-size:22px;">€${safeTotal}</td></tr>
        </table>
        <p style="margin:16px 0 0;font-size:13px;color:#c62828;"><strong>⏱️ Rezervácia platí 48 hodín.</strong> Ak si telefón dovtedy nevyzdvihnete, rezervácia sa automaticky zruší.</p>
        <p style="margin:8px 0 0;font-size:13px;color:#555;">📞 Pred príchodom nám prosím zavolajte na <strong>${SHOP_PHONE}</strong>, aby sme vás určite čakali.</p>
        <p style="margin:6px 0 0;"><a href="https://maps.app.goo.gl/GGBewDBR787dkxaC7" style="color:#1976d2;font-size:13px;">📍 Otvoriť v mapách</a></p>
      </div>`;

      const transferBlockHtml = `<div style="background:#e3f2fd;border:2px solid #1976d2;border-radius:10px;padding:24px;margin:24px 0;">
        <h2 style="color:#0d47a1;margin:0 0 16px;">💳 Platobné údaje</h2>
        <table style="width:100%;border-collapse:collapse;">
          <tr><td style="color:#555;padding:6px 0;width:160px;"><strong>Príjemca:</strong></td><td style="color:#0d47a1;font-weight:bold;">${RECIPIENT_NAME}</td></tr>
          <tr><td style="color:#555;padding:6px 0;width:160px;"><strong>IBAN:</strong></td><td style="color:#0d47a1;font-weight:bold;">${IBAN_DISPLAY}</td></tr>
          <tr><td style="color:#555;padding:6px 0;"><strong>Variabilný symbol:</strong></td><td style="color:#0d47a1;font-weight:bold;font-size:18px;">${orderId}</td></tr>
          <tr><td style="color:#555;padding:6px 0;"><strong>Suma:</strong></td><td style="color:#0d47a1;font-weight:bold;font-size:22px;">€${safeTotal}</td></tr>
        </table>
        <p style="margin:16px 0 0;font-size:13px;color:#777;">⚠️ Uveďte variabilný symbol – objednávku spárujeme podľa neho.</p>
      </div>
      <div style="background:#ffebee;border:1px solid #ef5350;border-radius:10px;padding:16px;margin:16px 0;">
        <p style="margin:0;color:#c62828;font-size:14px;"><strong>⏱️ Dôležité:</strong> Platba musí byť pripísaná do 48 hodín, inak bude rezervácia automaticky zrušená.</p>
      </div>`;

      const paymentBlockHtml = isPickup ? pickupBlockHtml : transferBlockHtml;

      const nextStepsHtml = (isPickup
        ? [
            'Telefón máte rezervovaný 48 hodín – vyzdvihnite si ho na adrese Dolná Súča 877',
            'Pred príchodom nám prosím zavolajte',
            'Telefón si na mieste pozriete a vyskúšate',
            'Zaplatíte až pri prevzatí',
          ]
        : [
            'Uhraďte objednávku prevodom do 48 hodín',
            'Po prijatí platby vám zašleme potvrdzujúci email',
            'Zásielku expedujeme do 1-2 pracovných dní',
            'Dostanete tracking číslo pre sledovanie balíka',
          ]).map((t) => `<li>${t}</li>`).join('');

      const customerHtml = `<!DOCTYPE html><html lang="sk"><head><meta charset="UTF-8"/></head>
<body style="font-family:Arial,sans-serif;background:#f5f5f5;margin:0;padding:20px;">
  <div style="max-width:600px;margin:0 auto;background:#fff;border-radius:12px;overflow:hidden;box-shadow:0 2px 8px rgba(0,0,0,0.1);">
    <div style="background:linear-gradient(135deg,#0d47a1,#42a5f5);padding:32px;text-align:center;">
      <h1 style="color:#fff;margin:0;font-size:28px;">✅ Objednávka prijatá!</h1>
      <p style="color:#bbdefb;margin:8px 0 0;">Číslo objednávky: <strong style="color:#fff;">#${orderId}</strong></p>
    </div>
    <div style="padding:32px;">
      <p style="font-size:16px;color:#333;">Ahoj <strong>${sanitize(customerName)}</strong>,</p>
      <p style="font-size:16px;color:#555;">${introText}</p>
      ${paymentBlockHtml}
      <h3 style="color:#0d47a1;margin:24px 0 12px;">📦 Obsah objednávky</h3>
      <table style="width:100%;border-collapse:collapse;">${productListHtml}</table>
      ${discountHtmlBlock}
      <div style="background:#f5f5f5;border-radius:10px;padding:16px;margin:16px 0;">
        <p style="margin:4px 0;color:#555;"><strong>Medzisúčet:</strong> €${safeSubtotal}</p>
        ${discountRowHtml}
        <p style="margin:4px 0;color:#555;"><strong>${isPickup ? 'Osobný odber' : 'Doprava'}:</strong> ${safeShipping === '0.00' ? '<span style="color:#4caf50;font-weight:bold;">ZADARMO ✅</span>' : '€' + safeShipping}</p>
        <p style="margin:12px 0 0;font-size:20px;font-weight:bold;color:#0d47a1;">CELKOM: €${safeTotal}</p>
      </div>
      <div style="background:#f5f5f5;border-radius:10px;padding:20px;margin:24px 0;">
        <h3 style="margin:0 0 12px;">${isPickup ? '🏪 Osobný odber' : '🚚 Doručenie'}</h3>
        <p style="margin:4px 0;color:#555;"><strong>Meno:</strong> ${sanitize(customerName)}</p>
        <p style="margin:4px 0;color:#555;"><strong>Telefón:</strong> ${sanitize(customerPhone)}</p>
        ${isPickup
          ? `<p style="margin:4px 0;color:#555;"><strong>Miesto odberu:</strong> ${PICKUP_ADDRESS}</p>`
          : `<p style="margin:4px 0;color:#555;"><strong>Adresa:</strong> ${street}, ${zip} ${city}</p>`}
      </div>
      <h3 style="color:#0d47a1;margin:24px 0 12px;">📋 Čo bude ďalej?</h3>
      <ol style="color:#555;line-height:1.8;padding-left:20px;">
        ${nextStepsHtml}
      </ol>
      <p style="color:#555;font-size:15px;margin-top:24px;">📞 <strong>0949 344 600</strong> &nbsp;|&nbsp; 📧 <a href="mailto:phoneservissk@gmail.com" style="color:#1976d2;">phoneservissk@gmail.com</a> &nbsp;|&nbsp; 🌐 <a href="https://fixanto.sk" style="color:#1976d2;">fixanto.sk</a></p>
    </div>
    <div style="background:#0d47a1;padding:20px;text-align:center;">
      <p style="color:#bbdefb;margin:0;font-size:13px;">Fixanto | fixanto.sk | phoneservissk@gmail.com</p>
    </div>
  </div>
</body></html>`;

      const adminHtml = `<!DOCTYPE html><html lang="sk"><head><meta charset="UTF-8"/></head>
<body style="font-family:Arial,sans-serif;background:#f5f5f5;margin:0;padding:20px;">
  <div style="max-width:600px;margin:0 auto;background:#fff;border-radius:12px;overflow:hidden;">
    <div style="background:linear-gradient(135deg,#1b5e20,#4caf50);padding:32px;text-align:center;">
      <h1 style="color:#fff;margin:0;">${isPickup ? '🏪 OSOBNÝ ODBER' : '🛒 NOVÁ OBJEDNÁVKA!'}</h1>
      <p style="color:#c8e6c9;margin:8px 0 0;">Číslo: <strong style="color:#fff;">#${orderId}</strong></p>
    </div>
    <div style="padding:32px;">
      <h2 style="color:#1b5e20;">👤 Zákazník</h2>
      <p style="margin:4px 0;"><strong>Meno:</strong> ${sanitize(customerName)}</p>
      <p style="margin:4px 0;"><strong>Email:</strong> ${sanitize(customerEmail)}</p>
      <p style="margin:4px 0;"><strong>Telefón:</strong> ${sanitize(customerPhone)}</p>
      ${isPickup ? '' : `<p style="margin:4px 0;"><strong>Adresa:</strong> ${street}, ${zip} ${city}</p>`}
      <p style="margin:4px 0;"><strong>Doručenie:</strong> ${shipping.name}</p>
      <p style="margin:4px 0;"><strong>Platba:</strong> ${isPickup ? 'pri prevzatí' : 'prevodom vopred'}</p>
      <h2 style="color:#1b5e20;margin-top:24px;">📦 Objednávka</h2>
      <table style="width:100%;border-collapse:collapse;">${productListHtml}</table>
      ${safeDiscountCode ? `<div style="background:#fff3cd;border:2px solid #ffc107;border-radius:10px;padding:15px;margin:16px 0;"><p style="margin:0;color:#856404;font-weight:bold;">💰 Zľavový kód: ${safeDiscountCode} (-${safeDiscountPercent}%) – Zľava: €${safeDiscount}</p></div>` : ''}
      <div style="background:#f5f5f5;border-radius:10px;padding:16px;margin:16px 0;">
        <p style="margin:4px 0;"><strong>Medzisúčet:</strong> €${safeSubtotal}</p>
        ${discountRowHtml}
        <p style="margin:4px 0;"><strong>Doprava:</strong> €${safeShipping}</p>
        <p style="margin:12px 0 0;font-size:20px;font-weight:bold;color:#1b5e20;">CELKOM: €${safeTotal}</p>
      </div>
      <div style="background:#fff3cd;border:1px solid #ffc107;border-radius:8px;padding:12px;margin-top:16px;">
        <p style="margin:0;color:#856404;"><strong>⚠️ Akcia:</strong> ${isPickup
          ? `Osobný odber – zákazník platí pri prevzatí (€${safeTotal}). Po odovzdaní nastav telefónu stock_status = sold_out. Ak si ho do 48 h nevyzdvihne, rezervácia sa zruší automaticky. Číslo: ${orderId}`
          : `Po prijatí platby nastav telefónu stock_status = sold_out (alebo is_active = false). Bez platby do 48 h sa rezervácia zruší automaticky. VS: ${orderId}`}</p>
      </div>
    </div>
  </div>
</body></html>`;

      await transporter.sendMail({
        from: `"Fixanto" <${process.env.GMAIL_USER}>`,
        to: sanitize(customerEmail),
        subject: `✅ Objednávka #${orderId} prijatá – Fixanto`,
        html: customerHtml,
        text: isPickup
          ? `Objednávka #${orderId} – OSOBNÝ ODBER\nMiesto odberu: ${PICKUP_ADDRESS}\nOtváracie hodiny: ${PICKUP_HOURS}\nPlatba pri prevzatí: €${safeTotal}\nRezervácia platí 48 hodín.\nPred príchodom nám prosím zavolajte na ${SHOP_PHONE}.\n\n${productListText}\n\n${discountTextLine}\nFixanto | 0949 344 600 | phoneservissk@gmail.com`
          : `Objednávka #${orderId}\nPríjemca: ${RECIPIENT_NAME}\nIBAN: ${IBAN_DISPLAY}\nVS: ${orderId}\nSuma: €${safeTotal}\n\n${productListText}\n\n${discountTextLine}Doprava: ${safeShipping === '0.00' ? 'ZADARMO' : '€' + safeShipping}\nAdresa: ${street}, ${zip} ${city}\n\nFixanto | 0949 344 600 | phoneservissk@gmail.com`,
      });

      await transporter.sendMail({
        from: `"Fixanto Store" <${process.env.GMAIL_USER}>`,
        to: process.env.GMAIL_USER,
        subject: `${isPickup ? '🏪 OSOBNÝ ODBER' : '🛒 NOVÁ OBJEDNÁVKA'} #${orderId} – ${sanitize(customerName)} – €${safeTotal}`,
        html: adminHtml,
        text: `NOVÁ OBJEDNÁVKA #${orderId}\n${customerName} | ${customerEmail} | ${customerPhone}\n${isPickup ? 'Osobný odber' : `${street}, ${zip} ${city}`}\n\n${productListText}\n\n${discountTextLine}Doprava: ${safeShipping === '0.00' ? 'ZADARMO' : '€' + safeShipping}\nCelkom: €${safeTotal}\n${isPickup ? `Osobný odber – platba pri prevzatí (${shipping.name})` : `VS: ${orderId}\n\nČakáme na platbu do 48h!`}`,
      });

    } catch (emailErr) {
      console.error('Email error:', emailErr);
    }

    return {
      statusCode: 200,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        success: true,
        orderId,
        subtotal,
        discountPercent,
        discountAmount,
        shippingPrice,
        totalPrice: totalFromDb,
      }),
    };

  } catch (err) {
    // Objednávka je už uložená – chyba mohla nastať len pri e-mailoch
    console.error('create-order post-processing error:', err);
    return json(200, { success: true, orderId, totalPrice: totalFromDb });
  }
};
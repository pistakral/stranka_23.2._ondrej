const { createClient } = require('@supabase/supabase-js');
const nodemailer = require('nodemailer');

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
const ADAPTER_PRICE = 15;
const ADAPTER_NAME = 'Nabíjací adaptér 20W (USB-C Power Adapter)';

// ── Handler ──────────────────────────────────────────────────────
exports.handler = async (event) => {
  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, body: 'Method Not Allowed' };
  }

  // Veľkosť requestu
  const bodySize = Buffer.byteLength(event.body || '', 'utf8');
  if (bodySize > 50000) {
    return { statusCode: 413, body: 'Request too large' };
  }

  // Parse JSON
  let body;
  try {
    body = JSON.parse(event.body);
  } catch {
    return { statusCode: 400, body: 'Invalid JSON' };
  }

  const {
    customerName, customerEmail, customerPhone,
    customerStreet, customerCity, customerZip,
    shippingMethod, shippingPrice,
    items, subtotal, totalPrice,
    discountCode, discountPercent, discountAmount,
    adapterAdded, notes,
  } = body;

  // ── Validácia ────────────────────────────────────────────────
  if (!customerName || !customerEmail || !customerPhone ||
      !customerStreet || !customerCity || !customerZip ||
      !shippingMethod || !items) {
    return { statusCode: 400, body: 'Missing required fields' };
  }

  if (!isValidEmail(customerEmail)) {
    return { statusCode: 400, body: 'Invalid email' };
  }

  if (String(customerPhone).replace(/\s/g, '').length < 9) {
    return { statusCode: 400, body: 'Invalid phone' };
  }

  if (!isValidPrice(Number(totalPrice)) || !isValidPrice(Number(shippingPrice))) {
    return { statusCode: 400, body: 'Invalid price' };
  }

  if (!Array.isArray(items) || items.length === 0 || items.length > 20) {
    return { statusCode: 400, body: 'Invalid items' };
  }

  for (const p of items) {
    if (!p.name || typeof p.price !== 'number' || !isValidPrice(p.price)) {
      return { statusCode: 400, body: 'Invalid item data' };
    }
  }

  // Injection ochrana
  const dangerousPattern = /(<script|javascript:|onerror=|DROP\s|DELETE\s|INSERT\s|UPDATE\s|SELECT\s|;--|\/\*)/gi;
  const allInputs = [customerName, customerEmail, customerPhone, customerStreet, customerCity, customerZip, notes || ''].join(' ');
  if (dangerousPattern.test(allInputs)) {
    return { statusCode: 400, body: 'Invalid characters in input' };
  }

  if (customerName.length > 100 || customerStreet.length > 200 || (notes || '').length > 500) {
    return { statusCode: 400, body: 'Input too long' };
  }

  // ── Supabase service_role klient (server-side only) ──────────
  const supabase = createClient(
    process.env.SUPABASE_URL,
    process.env.SUPABASE_SERVICE_ROLE_KEY,
    { auth: { persistSession: false } }
  );

  const orderId = Date.now().toString();

  try {
    // 1. Vytvor objednávku
    const { data: orderData, error: orderError } = await supabase
      .from('orders')
      .insert({
        order_number: orderId,
        customer_name: sanitize(customerName),
        customer_email: sanitize(customerEmail),
        customer_phone: sanitize(customerPhone),
        customer_street: sanitize(customerStreet),
        customer_city: sanitize(customerCity),
        customer_zip: sanitize(customerZip),
        subtotal: Number(subtotal),
        shipping_price: Number(shippingPrice),
        total_price: Number(totalPrice),
        shipping_method: sanitize(shippingMethod),
        payment_method: 'bank_transfer',
        status: 'pending',
        customer_notes: notes ? sanitize(notes) : null,
        discount_code: discountCode ? sanitize(String(discountCode)) : null,
        discount_percent: discountPercent || 0,
        discount_amount: discountAmount || 0,
        has_adapter: adapterAdded || false,
      })
      .select()
      .single();

    if (orderError) {
      console.error('Order insert error:', orderError);
      return { statusCode: 500, body: JSON.stringify({ success: false, error: 'Order creation failed' }) };
    }

    // 2. Vlož order_items
    const orderItems = [
      ...items.map((item) => ({
        order_id: orderData.id,
        product_id: null,
        product_name: sanitize(item.name),
        product_capacity: sanitize(item.capacity || ''),
        product_color: sanitize(item.color || ''),
        product_image: sanitize(item.image || ''),
        quantity: 1,
        unit_price: Number(item.price),
        total_price: Number(item.price),
      })),
      ...(adapterAdded ? [{
        order_id: orderData.id,
        product_id: null,
        product_name: ADAPTER_NAME,
        product_capacity: '',
        product_color: '',
        product_image: '',
        quantity: 1,
        unit_price: ADAPTER_PRICE,
        total_price: ADAPTER_PRICE,
      }] : []),
    ];

    const { error: itemsError } = await supabase.from('order_items').insert(orderItems);
    if (itemsError) console.error('Order items error:', itemsError);

    // 3. Rezervácie produktov
    for (const item of items) {
      if (!item.slug) continue;

      const { data: productData } = await supabase
        .from('products')
        .select('id, slug, stock')
        .eq('slug', item.slug)
        .maybeSingle();

      if (!productData) continue;

      await supabase.from('reservations').insert({
        product_id: productData.id,
        customer_email: sanitize(customerEmail),
        customer_name: sanitize(customerName),
        customer_phone: sanitize(customerPhone),
        status: 'pending',
        notes: `Objednávka #${orderId}`,
      });

      if (productData.stock === 1) {
        await supabase.rpc('reserve_product', { product_slug: item.slug });
      }
    }

    // 4. Odošli email
    try {
      const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: process.env.GMAIL_USER,
          pass: process.env.GMAIL_APP_PASSWORD,
        },
      });

      const safeProducts = items.map(p => ({
        name: sanitize(p.name),
        capacity: sanitize(p.capacity || ''),
        color: sanitize(p.color || ''),
        price: Number(p.price).toFixed(2),
      }));

      if (adapterAdded) {
        safeProducts.push({
          name: ADAPTER_NAME,
          capacity: '',
          color: '',
          price: ADAPTER_PRICE.toFixed(2),
        });
      }

      const productListHtml = safeProducts.map(p => `
        <tr>
          <td style="padding:8px;border-bottom:1px solid #eee;">${p.name}${p.capacity ? ' ' + p.capacity : ''}${p.color ? ' – ' + p.color : ''}</td>
          <td style="padding:8px;border-bottom:1px solid #eee;text-align:right;font-weight:bold;">€${p.price}</td>
        </tr>`).join('');

      const productListText = safeProducts
        .map(p => `  • ${p.name}${p.capacity ? ' ' + p.capacity : ''}${p.color ? ' – ' + p.color : ''}: €${p.price}`)
        .join('\n');

      const safeSubtotal = Number(subtotal).toFixed(2);
      const safeShipping = Number(shippingPrice).toFixed(2);
      const safeTotal = Number(totalPrice).toFixed(2);
      const safeDiscount = discountAmount ? Number(discountAmount).toFixed(2) : '0.00';
      const safeDiscountCode = discountCode ? sanitize(String(discountCode)) : null;
      const safeDiscountPercent = discountPercent || 0;

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

      const customerHtml = `<!DOCTYPE html><html lang="sk"><head><meta charset="UTF-8"/></head>
<body style="font-family:Arial,sans-serif;background:#f5f5f5;margin:0;padding:20px;">
  <div style="max-width:600px;margin:0 auto;background:#fff;border-radius:12px;overflow:hidden;box-shadow:0 2px 8px rgba(0,0,0,0.1);">
    <div style="background:linear-gradient(135deg,#0d47a1,#42a5f5);padding:32px;text-align:center;">
      <h1 style="color:#fff;margin:0;font-size:28px;">✅ Objednávka prijatá!</h1>
      <p style="color:#bbdefb;margin:8px 0 0;">Číslo objednávky: <strong style="color:#fff;">#${orderId}</strong></p>
    </div>
    <div style="padding:32px;">
      <p style="font-size:16px;color:#333;">Ahoj <strong>${sanitize(customerName)}</strong>,</p>
      <p style="font-size:16px;color:#555;">Ďakujeme za vašu objednávku! Prosíme o úhradu prevodom <strong>do 48 hodín</strong>.</p>
      <div style="background:#e3f2fd;border:2px solid #1976d2;border-radius:10px;padding:24px;margin:24px 0;">
        <h2 style="color:#0d47a1;margin:0 0 16px;">💳 Platobné údaje</h2>
        <table style="width:100%;border-collapse:collapse;">
          <tr><td style="color:#555;padding:6px 0;width:160px;"><strong>IBAN:</strong></td><td style="color:#0d47a1;font-weight:bold;">${IBAN_DISPLAY}</td></tr>
          <tr><td style="color:#555;padding:6px 0;"><strong>Variabilný symbol:</strong></td><td style="color:#0d47a1;font-weight:bold;font-size:18px;">${orderId}</td></tr>
          <tr><td style="color:#555;padding:6px 0;"><strong>Suma:</strong></td><td style="color:#0d47a1;font-weight:bold;font-size:22px;">€${safeTotal}</td></tr>
        </table>
        <p style="margin:16px 0 0;font-size:13px;color:#777;">⚠️ Uveďte variabilný symbol – objednávku spárujeme podľa neho.</p>
      </div>
      <div style="background:#ffebee;border:1px solid #ef5350;border-radius:10px;padding:16px;margin:16px 0;">
        <p style="margin:0;color:#c62828;font-size:14px;"><strong>⏱️ Dôležité:</strong> Platba musí byť pripísaná do 48 hodín, inak bude rezervácia zrušená.</p>
      </div>
      <h3 style="color:#0d47a1;margin:24px 0 12px;">📦 Obsah objednávky</h3>
      <table style="width:100%;border-collapse:collapse;">${productListHtml}</table>
      ${discountHtmlBlock}
      <div style="background:#f5f5f5;border-radius:10px;padding:16px;margin:16px 0;">
        <p style="margin:4px 0;color:#555;"><strong>Medzisúčet:</strong> €${safeSubtotal}</p>
        ${discountRowHtml}
        <p style="margin:4px 0;color:#555;"><strong>Doprava:</strong> ${safeShipping === '0.00' ? '<span style="color:#4caf50;font-weight:bold;">ZADARMO ✅</span>' : '€' + safeShipping}</p>
        <p style="margin:12px 0 0;font-size:20px;font-weight:bold;color:#0d47a1;">CELKOM: €${safeTotal}</p>
      </div>
      <div style="background:#f5f5f5;border-radius:10px;padding:20px;margin:24px 0;">
        <h3 style="margin:0 0 12px;">🚚 Doručenie</h3>
        <p style="margin:4px 0;color:#555;"><strong>Meno:</strong> ${sanitize(customerName)}</p>
        <p style="margin:4px 0;color:#555;"><strong>Telefón:</strong> ${sanitize(customerPhone)}</p>
        <p style="margin:4px 0;color:#555;"><strong>Adresa:</strong> ${sanitize(customerStreet)}, ${sanitize(customerZip)} ${sanitize(customerCity)}</p>
      </div>
      <h3 style="color:#0d47a1;margin:24px 0 12px;">📋 Čo bude ďalej?</h3>
      <ol style="color:#555;line-height:1.8;padding-left:20px;">
        <li>Uhraďte objednávku prevodom do 48 hodín</li>
        <li>Po prijatí platby vám zašleme potvrdzujúci email</li>
        <li>Zásielku expedujeme do 1-2 pracovných dní</li>
        <li>Dostanete tracking číslo pre sledovanie balíka</li>
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
      <h1 style="color:#fff;margin:0;">🛒 NOVÁ OBJEDNÁVKA!</h1>
      <p style="color:#c8e6c9;margin:8px 0 0;">Číslo: <strong style="color:#fff;">#${orderId}</strong></p>
    </div>
    <div style="padding:32px;">
      <h2 style="color:#1b5e20;">👤 Zákazník</h2>
      <p style="margin:4px 0;"><strong>Meno:</strong> ${sanitize(customerName)}</p>
      <p style="margin:4px 0;"><strong>Email:</strong> ${sanitize(customerEmail)}</p>
      <p style="margin:4px 0;"><strong>Telefón:</strong> ${sanitize(customerPhone)}</p>
      <p style="margin:4px 0;"><strong>Adresa:</strong> ${sanitize(customerStreet)}, ${sanitize(customerZip)} ${sanitize(customerCity)}</p>
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
        <p style="margin:0;color:#856404;"><strong>⚠️ Akcia:</strong> Po prijatí platby potvrď objednávku v Supabase Dashboard. VS: ${orderId}</p>
      </div>
    </div>
  </div>
</body></html>`;

      await transporter.sendMail({
        from: `"Fixanto" <${process.env.GMAIL_USER}>`,
        to: sanitize(customerEmail),
        subject: `✅ Objednávka #${orderId} prijatá – Fixanto`,
        html: customerHtml,
        text: `Objednávka #${orderId}\nIBAN: ${IBAN_DISPLAY}\nVS: ${orderId}\nSuma: €${safeTotal}\n\n${productListText}\n\n${discountTextLine}Doprava: ${safeShipping === '0.00' ? 'ZADARMO' : '€' + safeShipping}\nAdresa: ${customerStreet}, ${customerZip} ${customerCity}\n\nFixanto | 0949 344 600 | phoneservissk@gmail.com`,
      });

      await transporter.sendMail({
        from: `"Fixanto Store" <${process.env.GMAIL_USER}>`,
        to: process.env.GMAIL_USER,
        subject: `🛒 NOVÁ OBJEDNÁVKA #${orderId} – ${sanitize(customerName)} – €${safeTotal}`,
        html: adminHtml,
        text: `NOVÁ OBJEDNÁVKA #${orderId}\n${customerName} | ${customerEmail} | ${customerPhone}\n${customerStreet}, ${customerZip} ${customerCity}\n\n${productListText}\n\n${discountTextLine}Doprava: ${safeShipping === '0.00' ? 'ZADARMO' : '€' + safeShipping}\nCelkom: €${safeTotal}\nVS: ${orderId}\n\nČakáme na platbu do 48h!`,
      });

    } catch (emailErr) {
      // Email zlyhanie neprekazí objednávku
      console.error('Email error:', emailErr);
    }

    return {
      statusCode: 200,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ success: true, orderId }),
    };

  } catch (err) {
    console.error('create-order error:', err);
    return {
      statusCode: 500,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ success: false, error: 'Internal server error' }),
    };
  }
};
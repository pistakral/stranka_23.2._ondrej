const nodemailer = require('nodemailer');

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
  return typeof num === 'number' && num >= 0 && num <= 99999;
}

exports.handler = async (event) => {
  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, body: 'Method Not Allowed' };
  }

  const bodySize = Buffer.byteLength(event.body || '', 'utf8');
  if (bodySize > 50000) {
    return { statusCode: 413, body: 'Request too large' };
  }

  let order;
  try {
    order = JSON.parse(event.body);
  } catch {
    return { statusCode: 400, body: 'Invalid JSON' };
  }

  const {
    orderId, customerName, customerEmail, customerPhone,
    customerStreet, customerCity, customerZip, shippingMethod, shippingPrice, totalPrice,
    items, iban, variableSymbol,
  } = order;

  // Validácia
  if (!orderId || !customerName || !customerEmail || !customerPhone ||
      !customerStreet || !customerCity || !customerZip || !shippingMethod || !items || !variableSymbol) {
    return { statusCode: 400, body: 'Missing required fields' };
  }

  if (!isValidEmail(customerEmail)) {
    return { statusCode: 400, body: 'Invalid email address' };
  }

  if (!isValidPrice(totalPrice) || !isValidPrice(shippingPrice)) {
    return { statusCode: 400, body: 'Invalid price values' };
  }

  if (!Array.isArray(items) || items.length === 0 || items.length > 20) {
    return { statusCode: 400, body: 'Invalid items' };
  }

  for (const p of items) {
    if (!p.name || typeof p.price !== 'number') {
      return { statusCode: 400, body: 'Invalid item data' };
    }
  }

  const safe = {
    orderId: sanitize(String(orderId)),
    customerName: sanitize(customerName),
    customerEmail: sanitize(customerEmail),
    customerPhone: sanitize(customerPhone),
    customerStreet: sanitize(customerStreet),
    customerCity: sanitize(customerCity),
    customerZip: sanitize(customerZip),
    shippingMethod: sanitize(shippingMethod),
    shippingPrice: Number(shippingPrice).toFixed(2),
    totalPrice: Number(totalPrice).toFixed(2),
    iban: sanitize(iban || 'LT56 3250 0347 0476 1008'),
    variableSymbol: sanitize(String(variableSymbol)),
  };

  const safeProducts = items.map(p => ({
    name: sanitize(p.name),
    capacity: sanitize(p.capacity || ''),
    color: sanitize(p.color || ''),
    price: isValidPrice(p.price) ? Number(p.price).toFixed(2) : '0.00',
  }));

  const productListHtml = safeProducts
    .map(p => `
      <tr>
        <td style="padding:8px;border-bottom:1px solid #eee;">${p.name} ${p.capacity} – ${p.color}</td>
        <td style="padding:8px;border-bottom:1px solid #eee;text-align:right;font-weight:bold;">€${p.price}</td>
      </tr>`)
    .join('');

  const productListText = safeProducts
    .map(p => `  • ${p.name} ${p.capacity} – ${p.color}: €${p.price}`)
    .join('\n');

  const customerHtml = `
<!DOCTYPE html>
<html lang="sk">
<head><meta charset="UTF-8"/></head>
<body style="font-family:Arial,sans-serif;background:#f5f5f5;margin:0;padding:20px;">
  <div style="max-width:600px;margin:0 auto;background:#fff;border-radius:12px;overflow:hidden;box-shadow:0 2px 8px rgba(0,0,0,0.1);">
    <div style="background:linear-gradient(135deg,#0d47a1,#42a5f5);padding:32px;text-align:center;">
      <h1 style="color:#fff;margin:0;font-size:28px;">✅ Objednávka prijatá!</h1>
      <p style="color:#bbdefb;margin:8px 0 0;">Číslo objednávky: <strong style="color:#fff;">#${safe.orderId}</strong></p>
    </div>
    <div style="padding:32px;">
      <p style="font-size:16px;color:#333;">Ahoj <strong>${safe.customerName}</strong>,</p>
      <p style="font-size:16px;color:#555;">Ďakujeme za vašu objednávku! Prosíme o úhradu prevodom na bankový účet <strong>do 48 hodín</strong>.</p>

      <div style="background:#e3f2fd;border:2px solid #1976d2;border-radius:10px;padding:24px;margin:24px 0;">
        <h2 style="color:#0d47a1;margin:0 0 16px;font-size:20px;">💳 Platobné údaje</h2>
        <table style="width:100%;border-collapse:collapse;">
          <tr><td style="color:#555;padding:6px 0;width:160px;"><strong>IBAN:</strong></td><td style="color:#0d47a1;font-weight:bold;font-size:15px;">${safe.iban}</td></tr>
          <tr><td style="color:#555;padding:6px 0;"><strong>Variabilný symbol:</strong></td><td style="color:#0d47a1;font-weight:bold;font-size:18px;">${safe.variableSymbol}</td></tr>
          <tr><td style="color:#555;padding:6px 0;"><strong>Suma:</strong></td><td style="color:#0d47a1;font-weight:bold;font-size:22px;">€${safe.totalPrice}</td></tr>
        </table>
        <p style="margin:16px 0 0;font-size:13px;color:#777;">⚠️ Prosím, uveďte variabilný symbol – objednávku spárujeme podľa neho.</p>
      </div>

      <div style="background:#fff8e1;border:1px solid #ffc107;border-radius:10px;padding:16px;margin:16px 0;text-align:center;">
        <p style="margin:0;color:#795548;font-size:15px;">📱 <strong>QR kód na platbu</strong> je dostupný na stránke po dokončení objednávky.</p>
        <p style="margin:8px 0 0;color:#795548;font-size:13px;">Naskenuj ho v mobilnej appke svojej banky.</p>
      </div>

      <div style="background:#ffebee;border:1px solid #ef5350;border-radius:10px;padding:16px;margin:16px 0;">
        <p style="margin:0;color:#c62828;font-size:14px;"><strong>⏱️ Dôležité:</strong> Platba musí byť pripísaná do 48 hodín, inak bude rezervácia automaticky zrušená.</p>
      </div>

      <h3 style="color:#0d47a1;margin:24px 0 12px;">📦 Obsah objednávky</h3>
      <table style="width:100%;border-collapse:collapse;">
        ${productListHtml}
        <tr style="background:#f5f5f5;">
          <td style="padding:8px;font-weight:bold;">Doprava: ${safe.shippingMethod}</td>
          <td style="padding:8px;text-align:right;">€${safe.shippingPrice}</td>
        </tr>
        <tr style="background:#e3f2fd;">
          <td style="padding:12px;font-weight:bold;font-size:18px;">CELKOM</td>
          <td style="padding:12px;text-align:right;font-weight:bold;font-size:20px;color:#0d47a1;">€${safe.totalPrice}</td>
        </tr>
      </table>

      <div style="background:#f5f5f5;border-radius:10px;padding:20px;margin:24px 0;">
        <h3 style="margin:0 0 12px;color:#333;">🚚 Doručenie</h3>
        <p style="margin:4px 0;color:#555;"><strong>Meno:</strong> ${safe.customerName}</p>
        <p style="margin:4px 0;color:#555;"><strong>Email:</strong> ${safe.customerEmail}</p>
        <p style="margin:4px 0;color:#555;"><strong>Telefón:</strong> ${safe.customerPhone}</p>
        <p style="margin:4px 0;color:#555;"><strong>Adresa:</strong> ${safe.customerStreet}, ${safe.customerZip} ${safe.customerCity}</p>
        <p style="margin:4px 0;color:#555;"><strong>Spôsob dopravy:</strong> ${safe.shippingMethod} ${safe.shippingPrice === '0.00' ? '<span style="color:#4caf50;font-weight:bold;">ZDARMA ✅</span>' : ''}</p>
      </div>

      <h3 style="color:#0d47a1;margin:24px 0 12px;">📋 Čo bude ďalej?</h3>
      <ol style="color:#555;line-height:1.8;padding-left:20px;">
        <li>Uhraďte objednávku prevodom do 48 hodín</li>
        <li>Po prijatí platby vám zašleme potvrdzujúci email</li>
        <li>Zásielku expedujeme do 1-2 pracovných dní</li>
        <li>Dostanete tracking číslo pre sledovanie balíka</li>
      </ol>

      <p style="color:#555;font-size:15px;margin-top:24px;">V prípade otázok nás kontaktujte:</p>
      <p style="color:#555;font-size:15px;margin:4px 0;">📞 Telefón: <strong>0949 344 600</strong></p>
      <p style="color:#555;font-size:15px;margin:4px 0;">📧 Email: <a href="mailto:phoneservissk@gmail.com" style="color:#1976d2;">phoneservissk@gmail.com</a></p>
      <p style="color:#555;font-size:15px;margin:4px 0;">🌐 Web: <a href="https://fixanto.sk" style="color:#1976d2;">fixanto.sk</a></p>
    </div>
    <div style="background:#0d47a1;padding:20px;text-align:center;">
      <p style="color:#bbdefb;margin:0;font-size:13px;">Fixanto | fixanto.sk | phoneservissk@gmail.com</p>
    </div>
  </div>
</body>
</html>`;

  const adminHtml = `
<!DOCTYPE html>
<html lang="sk">
<head><meta charset="UTF-8"/></head>
<body style="font-family:Arial,sans-serif;background:#f5f5f5;margin:0;padding:20px;">
  <div style="max-width:600px;margin:0 auto;background:#fff;border-radius:12px;overflow:hidden;box-shadow:0 2px 8px rgba(0,0,0,0.1);">
    <div style="background:linear-gradient(135deg,#1b5e20,#4caf50);padding:32px;text-align:center;">
      <h1 style="color:#fff;margin:0;font-size:28px;">🛒 NOVÁ OBJEDNÁVKA!</h1>
      <p style="color:#c8e6c9;margin:8px 0 0;">Číslo: <strong style="color:#fff;">#${safe.orderId}</strong></p>
    </div>
    <div style="padding:32px;">
      <h2 style="color:#1b5e20;">👤 Zákazník</h2>
      <p style="margin:4px 0;"><strong>Meno:</strong> ${safe.customerName}</p>
      <p style="margin:4px 0;"><strong>Email:</strong> ${safe.customerEmail}</p>
      <p style="margin:4px 0;"><strong>Telefón:</strong> ${safe.customerPhone}</p>
      <p style="margin:4px 0;"><strong>Adresa:</strong> ${safe.customerStreet}, ${safe.customerZip} ${safe.customerCity}</p>

      <h2 style="color:#1b5e20;margin-top:24px;">📦 Objednávka</h2>
      <table style="width:100%;border-collapse:collapse;">
        ${productListHtml}
        <tr style="background:#f5f5f5;">
          <td style="padding:8px;">Doprava: ${safe.shippingMethod}</td>
          <td style="padding:8px;text-align:right;">€${safe.shippingPrice}</td>
        </tr>
        <tr style="background:#e8f5e9;">
          <td style="padding:12px;font-weight:bold;font-size:18px;">CELKOM</td>
          <td style="padding:12px;text-align:right;font-weight:bold;font-size:20px;color:#1b5e20;">€${safe.totalPrice}</td>
        </tr>
      </table>

      <h2 style="color:#1b5e20;margin-top:24px;">💳 Čakáme na platbu (48h)</h2>
      <p style="margin:4px 0;"><strong>VS:</strong> ${safe.variableSymbol}</p>
      <p style="margin:4px 0;"><strong>Suma:</strong> €${safe.totalPrice}</p>
      
      <div style="background:#fff3cd;border:1px solid #ffc107;border-radius:8px;padding:12px;margin-top:16px;">
        <p style="margin:0;color:#856404;"><strong>⚠️ Akcia potrebná:</strong> Po prijatí platby potvrď objednávku v Supabase Dashboard.</p>
      </div>
    </div>
  </div>
</body>
</html>`;

  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.GMAIL_USER,
      pass: process.env.GMAIL_APP_PASSWORD,
    },
  });

  try {
    // Email pre zákazníka
    await transporter.sendMail({
      from: `"Fixanto" <${process.env.GMAIL_USER}>`,
      to: safe.customerEmail,
      subject: `✅ Objednávka #${safe.orderId} prijatá – Fixanto`,
      html: customerHtml,
      text: `Objednávka #${safe.orderId} prijatá!\n\nIBAN: ${safe.iban}\nVS: ${safe.variableSymbol}\nSuma: €${safe.totalPrice}\n\nPlatba do 48 hodín!\n\n${productListText}\n\nDoprava: ${safe.shippingMethod} ${safe.shippingPrice === '0.00' ? 'ZDARMA' : '€' + safe.shippingPrice}\nAdresa: ${safe.customerStreet}, ${safe.customerZip} ${safe.customerCity}\n\nFixanto | 0949 344 600 | phoneservissk@gmail.com`,
    });

    // Email pre admina
    await transporter.sendMail({
      from: `"Fixanto Store" <${process.env.GMAIL_USER}>`,
      to: process.env.GMAIL_USER,
      subject: `🛒 NOVÁ OBJEDNÁVKA #${safe.orderId} – ${safe.customerName} – €${safe.totalPrice}`,
      html: adminHtml,
      text: `NOVÁ OBJEDNÁVKA #${safe.orderId}\n${safe.customerName} | ${safe.customerEmail} | ${safe.customerPhone}\n${safe.customerStreet}, ${safe.customerZip} ${safe.customerCity}\n\n${productListText}\n\nDoprava: ${safe.shippingMethod} ${safe.shippingPrice === '0.00' ? 'ZDARMA' : '€' + safe.shippingPrice}\nCelkom: €${safe.totalPrice}\nVS: ${safe.variableSymbol}\n\nČakáme na platbu do 48h!`,
    });

    return {
      statusCode: 200,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ success: true }),
    };
  } catch (err) {
    console.error('Email error:', err);
    return {
      statusCode: 500,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ success: false, error: err.message }),
    };
  }
};
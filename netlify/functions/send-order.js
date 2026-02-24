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
    street, city, zip, shipping, shippingPrice, total,
    products, iban, variableSymbol,
  } = order;

  if (!orderId || !customerName || !customerEmail || !customerPhone ||
      !street || !city || !zip || !shipping || !products || !variableSymbol) {
    return { statusCode: 400, body: 'Missing required fields' };
  }

  if (!isValidEmail(customerEmail)) {
    return { statusCode: 400, body: 'Invalid email address' };
  }

  if (!isValidPrice(total) || !isValidPrice(shippingPrice)) {
    return { statusCode: 400, body: 'Invalid price values' };
  }

  if (!Array.isArray(products) || products.length === 0 || products.length > 20) {
    return { statusCode: 400, body: 'Invalid products' };
  }

  for (const p of products) {
    if (!p.name || typeof p.price !== 'number') {
      return { statusCode: 400, body: 'Invalid product data' };
    }
  }

  const safe = {
    orderId: sanitize(String(orderId)),
    customerName: sanitize(customerName),
    customerEmail: sanitize(customerEmail),
    customerPhone: sanitize(customerPhone),
    street: sanitize(street),
    city: sanitize(city),
    zip: sanitize(zip),
    shipping: sanitize(shipping),
    shippingPrice: Number(shippingPrice).toFixed(2),
    total: Number(total).toFixed(2),
    iban: sanitize(iban || ''),
    variableSymbol: sanitize(String(variableSymbol)),
  };

  const safeProducts = products.map(p => ({
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
      <p style="font-size:16px;color:#555;">Ďakujeme za vašu objednávku! Prosíme o úhradu prevodom na bankový účet.</p>

      <div style="background:#e3f2fd;border:2px solid #1976d2;border-radius:10px;padding:24px;margin:24px 0;">
        <h2 style="color:#0d47a1;margin:0 0 16px;font-size:20px;">💳 Platobné údaje</h2>
        <table style="width:100%;border-collapse:collapse;">
          <tr><td style="color:#555;padding:6px 0;width:160px;"><strong>IBAN:</strong></td><td style="color:#0d47a1;font-weight:bold;font-size:15px;">${safe.iban}</td></tr>
          <tr><td style="color:#555;padding:6px 0;"><strong>Variabilný symbol:</strong></td><td style="color:#0d47a1;font-weight:bold;font-size:18px;">${safe.variableSymbol}</td></tr>
          <tr><td style="color:#555;padding:6px 0;"><strong>Suma:</strong></td><td style="color:#0d47a1;font-weight:bold;font-size:22px;">€${safe.total}</td></tr>
        </table>
        <p style="margin:16px 0 0;font-size:13px;color:#777;">⚠️ Prosím, uveďte variabilný symbol – objednávku spárujeme podľa neho.</p>
      </div>

      <div style="background:#fff8e1;border:1px solid #ffc107;border-radius:10px;padding:16px;margin:16px 0;text-align:center;">
        <p style="margin:0;color:#795548;font-size:15px;">📱 <strong>QR kód na platbu</strong> je dostupný na stránke po dokončení objednávky.</p>
        <p style="margin:8px 0 0;color:#795548;font-size:13px;">Naskenuj ho v mobilnej appke svojej banky.</p>
      </div>

      <h3 style="color:#0d47a1;margin:24px 0 12px;">📦 Obsah objednávky</h3>
      <table style="width:100%;border-collapse:collapse;">
        ${productListHtml}
        <tr style="background:#f5f5f5;">
          <td style="padding:8px;font-weight:bold;">Doprava: ${safe.shipping}</td>
          <td style="padding:8px;text-align:right;">€${safe.shippingPrice}</td>
        </tr>
        <tr style="background:#e3f2fd;">
          <td style="padding:12px;font-weight:bold;font-size:18px;">CELKOM</td>
          <td style="padding:12px;text-align:right;font-weight:bold;font-size:20px;color:#0d47a1;">€${safe.total}</td>
        </tr>
      </table>

      <div style="background:#f5f5f5;border-radius:10px;padding:20px;margin:24px 0;">
        <h3 style="margin:0 0 12px;color:#333;">🚚 Doručenie</h3>
        <p style="margin:4px 0;color:#555;"><strong>Meno:</strong> ${safe.customerName}</p>
        <p style="margin:4px 0;color:#555;"><strong>Email:</strong> ${safe.customerEmail}</p>
        <p style="margin:4px 0;color:#555;"><strong>Telefón:</strong> ${safe.customerPhone}</p>
        <p style="margin:4px 0;color:#555;"><strong>Ulica:</strong> ${safe.street}</p>
        <p style="margin:4px 0;color:#555;"><strong>Mesto:</strong> ${safe.zip} ${safe.city}</p>
        <p style="margin:4px 0;color:#555;"><strong>Spôsob dopravy:</strong> ${safe.shipping}</p>
      </div>

      <p style="color:#555;font-size:15px;">Po prijatí platby vám zašleme tracking číslo pre sledovanie zásielky.</p>
      <p style="color:#555;font-size:15px;">V prípade otázok nás kontaktujte na <a href="mailto:phoneservissk@gmail.com" style="color:#1976d2;">phoneservissk@gmail.com</a></p>
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
      <p style="margin:4px 0;"><strong>Ulica:</strong> ${safe.street}</p>
      <p style="margin:4px 0;"><strong>Mesto:</strong> ${safe.zip} ${safe.city}</p>

      <h2 style="color:#1b5e20;margin-top:24px;">📦 Objednávka</h2>
      <table style="width:100%;border-collapse:collapse;">
        ${productListHtml}
        <tr style="background:#f5f5f5;">
          <td style="padding:8px;">Doprava: ${safe.shipping}</td>
          <td style="padding:8px;text-align:right;">€${safe.shippingPrice}</td>
        </tr>
        <tr style="background:#e8f5e9;">
          <td style="padding:12px;font-weight:bold;font-size:18px;">CELKOM</td>
          <td style="padding:12px;text-align:right;font-weight:bold;font-size:20px;color:#1b5e20;">€${safe.total}</td>
        </tr>
      </table>

      <h2 style="color:#1b5e20;margin-top:24px;">💳 Čakáme na platbu</h2>
      <p style="margin:4px 0;"><strong>VS:</strong> ${safe.variableSymbol}</p>
      <p style="margin:4px 0;"><strong>Suma:</strong> €${safe.total}</p>
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
    await transporter.sendMail({
      from: `"Fixanto" <${process.env.GMAIL_USER}>`,
      to: safe.customerEmail,
      subject: `✅ Objednávka #${safe.orderId} prijatá – Fixanto`,
      html: customerHtml,
      text: `Objednávka #${safe.orderId} prijatá!\n\nIBAN: ${safe.iban}\nVS: ${safe.variableSymbol}\nSuma: €${safe.total}\n\n${productListText}\n\nDoprava: ${safe.shipping} – €${safe.shippingPrice}\nAdresa: ${safe.street}, ${safe.zip} ${safe.city}\n\nFixanto`,
    });

    await transporter.sendMail({
      from: `"Fixanto Store" <${process.env.GMAIL_USER}>`,
      to: process.env.GMAIL_USER,
      subject: `🛒 NOVÁ OBJEDNÁVKA #${safe.orderId} – ${safe.customerName} – €${safe.total}`,
      html: adminHtml,
      text: `NOVÁ OBJEDNÁVKA #${safe.orderId}\n${safe.customerName} | ${safe.customerEmail} | ${safe.customerPhone}\n${safe.street}, ${safe.zip} ${safe.city}\n\n${productListText}\n\nDoprava: ${safe.shipping} – €${safe.shippingPrice}\nCelkom: €${safe.total}\nVS: ${safe.variableSymbol}`,
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
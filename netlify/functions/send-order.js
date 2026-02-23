const nodemailer = require('nodemailer');

exports.handler = async (event) => {
  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, body: 'Method Not Allowed' };
  }

  let order;
  try {
    order = JSON.parse(event.body);
  } catch {
    return { statusCode: 400, body: 'Invalid JSON' };
  }

  const {
    orderId,
    customerName,
    customerEmail,
    customerPhone,
    city,
    zip,
    shipping,
    shippingPrice,
    total,
    products,
    iban,
    variableSymbol,
  } = order;

  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.GMAIL_USER,
      pass: process.env.GMAIL_APP_PASSWORD,
    },
  });

  const productListHtml = products
    .map(
      (p) => `
      <tr>
        <td style="padding:8px;border-bottom:1px solid #eee;">${p.name} ${p.capacity} – ${p.color}</td>
        <td style="padding:8px;border-bottom:1px solid #eee;text-align:right;font-weight:bold;">€${p.price}</td>
      </tr>`
    )
    .join('');

  const productListText = products
    .map((p) => `  • ${p.name} ${p.capacity} – ${p.color}: €${p.price}`)
    .join('\n');

  // ── EMAIL PRE ZÁKAZNÍKA ──────────────────────────────────────────────────
  const customerHtml = `
<!DOCTYPE html>
<html lang="sk">
<head><meta charset="UTF-8"/></head>
<body style="font-family:Arial,sans-serif;background:#f5f5f5;margin:0;padding:20px;">
  <div style="max-width:600px;margin:0 auto;background:#fff;border-radius:12px;overflow:hidden;box-shadow:0 2px 8px rgba(0,0,0,0.1);">
    
    <!-- HEADER -->
    <div style="background:linear-gradient(135deg,#0d47a1,#42a5f5);padding:32px;text-align:center;">
      <h1 style="color:#fff;margin:0;font-size:28px;">✅ Objednávka prijatá!</h1>
      <p style="color:#bbdefb;margin:8px 0 0;">Číslo objednávky: <strong style="color:#fff;">#${orderId}</strong></p>
    </div>

    <div style="padding:32px;">
      <p style="font-size:16px;color:#333;">Ahoj <strong>${customerName}</strong>,</p>
      <p style="font-size:16px;color:#555;">Ďakujeme za vašu objednávku! Prosíme o úhradu prevodom na bankový účet.</p>

      <!-- PLATOBNÉ ÚDAJE -->
      <div style="background:#e3f2fd;border:2px solid #1976d2;border-radius:10px;padding:24px;margin:24px 0;">
        <h2 style="color:#0d47a1;margin:0 0 16px;font-size:20px;">💳 Platobné údaje</h2>
        <table style="width:100%;border-collapse:collapse;">
          <tr><td style="color:#555;padding:6px 0;width:160px;"><strong>IBAN:</strong></td><td style="color:#0d47a1;font-weight:bold;font-size:15px;">${iban}</td></tr>
          <tr><td style="color:#555;padding:6px 0;"><strong>Variabilný symbol:</strong></td><td style="color:#0d47a1;font-weight:bold;font-size:18px;">${variableSymbol}</td></tr>
          <tr><td style="color:#555;padding:6px 0;"><strong>Suma:</strong></td><td style="color:#0d47a1;font-weight:bold;font-size:22px;">€${total}</td></tr>
        </table>
        <p style="margin:16px 0 0;font-size:13px;color:#777;">⚠️ Prosím, uveďte variabilný symbol – objednávku spárujeme podľa neho.</p>
      </div>

      <!-- QR KÓD INFO -->
      <div style="background:#fff8e1;border:1px solid #ffc107;border-radius:10px;padding:16px;margin:16px 0;text-align:center;">
        <p style="margin:0;color:#795548;font-size:15px;">📱 <strong>QR kód na platbu</strong> je dostupný na stránke po dokončení objednávky.</p>
        <p style="margin:8px 0 0;color:#795548;font-size:13px;">Naskenuj ho v mobilnej appke svojej banky.</p>
      </div>

      <!-- PRODUKTY -->
      <h3 style="color:#0d47a1;margin:24px 0 12px;">📦 Obsah objednávky</h3>
      <table style="width:100%;border-collapse:collapse;">
        ${productListHtml}
        <tr style="background:#f5f5f5;">
          <td style="padding:8px;font-weight:bold;">Doprava: ${shipping}</td>
          <td style="padding:8px;text-align:right;">€${shippingPrice}</td>
        </tr>
        <tr style="background:#e3f2fd;">
          <td style="padding:12px;font-weight:bold;font-size:18px;">CELKOM</td>
          <td style="padding:12px;text-align:right;font-weight:bold;font-size:20px;color:#0d47a1;">€${total}</td>
        </tr>
      </table>

      <!-- DORUČENIE -->
      <div style="background:#f5f5f5;border-radius:10px;padding:20px;margin:24px 0;">
        <h3 style="margin:0 0 12px;color:#333;">🚚 Doručenie</h3>
        <p style="margin:4px 0;color:#555;"><strong>Meno:</strong> ${customerName}</p>
        <p style="margin:4px 0;color:#555;"><strong>Email:</strong> ${customerEmail}</p>
        <p style="margin:4px 0;color:#555;"><strong>Telefón:</strong> ${customerPhone}</p>
        <p style="margin:4px 0;color:#555;"><strong>Adresa:</strong> ${city}, ${zip}</p>
        <p style="margin:4px 0;color:#555;"><strong>Spôsob dopravy:</strong> ${shipping}</p>
      </div>

      <p style="color:#555;font-size:15px;">Po prijatí platby vám zašleme tracking číslo pre sledovanie zásielky.</p>
      <p style="color:#555;font-size:15px;">V prípade otázok nás kontaktujte na <a href="mailto:phoneservissk@gmail.com" style="color:#1976d2;">phoneservissk@gmail.com</a></p>
    </div>

    <!-- FOOTER -->
    <div style="background:#0d47a1;padding:20px;text-align:center;">
      <p style="color:#bbdefb;margin:0;font-size:13px;">Fixanto | fixanto.sk | phoneservissk@gmail.com</p>
    </div>
  </div>
</body>
</html>`;

  // ── EMAIL PRE ADMINA ─────────────────────────────────────────────────────
  const adminHtml = `
<!DOCTYPE html>
<html lang="sk">
<head><meta charset="UTF-8"/></head>
<body style="font-family:Arial,sans-serif;background:#f5f5f5;margin:0;padding:20px;">
  <div style="max-width:600px;margin:0 auto;background:#fff;border-radius:12px;overflow:hidden;box-shadow:0 2px 8px rgba(0,0,0,0.1);">
    <div style="background:linear-gradient(135deg,#1b5e20,#4caf50);padding:32px;text-align:center;">
      <h1 style="color:#fff;margin:0;font-size:28px;">🛒 NOVÁ OBJEDNÁVKA!</h1>
      <p style="color:#c8e6c9;margin:8px 0 0;">Číslo: <strong style="color:#fff;">#${orderId}</strong></p>
    </div>
    <div style="padding:32px;">
      <h2 style="color:#1b5e20;">👤 Zákazník</h2>
      <p style="margin:4px 0;"><strong>Meno:</strong> ${customerName}</p>
      <p style="margin:4px 0;"><strong>Email:</strong> ${customerEmail}</p>
      <p style="margin:4px 0;"><strong>Telefón:</strong> ${customerPhone}</p>
      <p style="margin:4px 0;"><strong>Mesto/PSČ:</strong> ${city}, ${zip}</p>
      
      <h2 style="color:#1b5e20;margin-top:24px;">📦 Objednávka</h2>
      <table style="width:100%;border-collapse:collapse;">
        ${productListHtml}
        <tr style="background:#f5f5f5;">
          <td style="padding:8px;">Doprava: ${shipping}</td>
          <td style="padding:8px;text-align:right;">€${shippingPrice}</td>
        </tr>
        <tr style="background:#e8f5e9;">
          <td style="padding:12px;font-weight:bold;font-size:18px;">CELKOM</td>
          <td style="padding:12px;text-align:right;font-weight:bold;font-size:20px;color:#1b5e20;">€${total}</td>
        </tr>
      </table>

      <h2 style="color:#1b5e20;margin-top:24px;">💳 Čakáme na platbu</h2>
      <p style="margin:4px 0;"><strong>VS:</strong> ${variableSymbol}</p>
      <p style="margin:4px 0;"><strong>Suma:</strong> €${total}</p>
    </div>
  </div>
</body>
</html>`;

  try {
    // Poslať zákazníkovi
    await transporter.sendMail({
      from: `"Fixanto" <${process.env.GMAIL_USER}>`,
      to: customerEmail,
      subject: `✅ Objednávka #${orderId} prijatá – Fixanto`,
      html: customerHtml,
      text: `Objednávka #${orderId} prijatá!\n\nPlatobné údaje:\nIBAN: ${iban}\nVariabilný symbol: ${variableSymbol}\nSuma: €${total}\n\nProdukt(y):\n${productListText}\n\nDoprava: ${shipping} – €${shippingPrice}\n\nĎakujeme za nákup!\nFixanto`,
    });

    // Poslať adminovi
    await transporter.sendMail({
      from: `"Fixanto Store" <${process.env.GMAIL_USER}>`,
      to: process.env.GMAIL_USER,
      subject: `🛒 NOVÁ OBJEDNÁVKA #${orderId} – ${customerName} – €${total}`,
      html: adminHtml,
      text: `NOVÁ OBJEDNÁVKA #${orderId}\nZákazník: ${customerName} | ${customerEmail} | ${customerPhone}\nMiesto: ${city}, ${zip}\nProdukt(y):\n${productListText}\nDoprava: ${shipping} – €${shippingPrice}\nCelkom: €${total}\nVS: ${variableSymbol}`,
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
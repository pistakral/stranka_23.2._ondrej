const nodemailer = require('nodemailer');

function sanitize(str) {
  return String(str).replace(/[<>]/g, '').trim().slice(0, 500);
}

exports.handler = async (event) => {
  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, body: 'Method Not Allowed' };
  }

  try {
    const order = JSON.parse(event.body);

    const {
      orderId, customerName, customerEmail, customerPhone,
      customerStreet, customerCity, customerZip, shippingMethod, shippingPrice, totalPrice,
      items, iban, variableSymbol, subtotal,
      discountCode, discountPercent, discountAmount,
    } = order;

    if (!orderId || !customerName || !customerEmail || !customerPhone ||
        !customerStreet || !customerCity || !customerZip || !shippingMethod || !items || !variableSymbol) {
      return { statusCode: 400, body: 'Missing required fields' };
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(customerEmail)) {
      return { statusCode: 400, body: 'Invalid email format' };
    }

    if (Number(totalPrice) < 0 || Number(totalPrice) > 20000) {
      return { statusCode: 400, body: 'Invalid total price' };
    }

    if (String(customerPhone).length < 9) {
      return { statusCode: 400, body: 'Invalid phone number' };
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
      subtotal: Number(subtotal || totalPrice).toFixed(2),
      iban: sanitize(iban || 'LT56 3250 0347 0476 1008'),
      variableSymbol: sanitize(String(variableSymbol)),
      discountCode: discountCode ? sanitize(String(discountCode)) : null,
      discountPercent: discountPercent || 0,
      discountAmount: discountAmount ? Number(discountAmount).toFixed(2) : '0.00',
    };

    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.GMAIL_USER,
        pass: process.env.GMAIL_APP_PASSWORD,
      },
    });

    const productListHtml = items.map((item, idx) => `
      <div style="display:flex;align-items:center;gap:12px;padding:12px;background:#f9f9f9;border-radius:8px;margin-bottom:8px;">
        <div style="flex:1;">
          <strong>${sanitize(item.name)} ${sanitize(item.capacity)} ${sanitize(item.color)}</strong>
        </div>
        <div style="font-weight:bold;color:#1565c0;">€${Number(item.price).toFixed(2)}</div>
      </div>
    `).join('');

    const productListText = items.map((item) => 
      `${sanitize(item.name)} ${sanitize(item.capacity)} ${sanitize(item.color)} - €${Number(item.price).toFixed(2)}`
    ).join('\n');

    await transporter.sendMail({
      from: `"Fixanto" <${process.env.GMAIL_USER}>`,
      to: safe.customerEmail,
      subject: `Potvrdenie objednávky #${safe.orderId} - Fixanto`,
      text: `Objednávka #${safe.orderId} prijatá!\n\nIBAN: ${safe.iban}\nVS: ${safe.variableSymbol}\nSuma: €${safe.totalPrice}\n\nPlatba do 48 hodín!\n\n${productListText}\n\n${safe.discountCode ? `Zľava (${safe.discountCode} -${safe.discountPercent}%): -€${safe.discountAmount}\n` : ''}Doprava: ${safe.shippingMethod} ${safe.shippingPrice === '0.00' ? 'ZADARMO' : '€' + safe.shippingPrice}\nAdresa: ${safe.customerStreet}, ${safe.customerZip} ${safe.customerCity}\n\nFixanto | 0949 344 600 | phoneservissk@gmail.com`,
      html: `
        <!DOCTYPE html>
        <html>
        <head><meta charset="UTF-8"></head>
        <body style="font-family:Arial,sans-serif;line-height:1.6;color:#333;max-width:600px;margin:0 auto;padding:20px;">
          <div style="background:linear-gradient(135deg,#1e3a8a 0%,#3b82f6 100%);color:white;padding:30px;border-radius:12px;text-align:center;margin-bottom:24px;">
            <h1 style="margin:0;font-size:28px;">✅ Objednávka prijatá!</h1>
            <p style="margin:8px 0 0;font-size:18px;">Číslo objednávky: <strong>#${safe.orderId}</strong></p>
          </div>

          <div style="background:#fff3cd;border:2px solid #ffc107;border-radius:10px;padding:20px;margin:24px 0;">
            <h2 style="margin:0 0 12px;color:#856404;">💳 Platobné údaje</h2>
            <p style="margin:4px 0;"><strong>IBAN:</strong> <span style="font-family:monospace;font-size:16px;color:#1565c0;">${safe.iban}</span></p>
            <p style="margin:4px 0;"><strong>Variabilný symbol:</strong> <span style="font-size:18px;font-weight:bold;color:#1565c0;">${safe.variableSymbol}</span></p>
            <p style="margin:4px 0;"><strong>Suma:</strong> <span style="font-size:20px;font-weight:bold;color:#d32f2f;">€${safe.totalPrice}</span></p>
            <p style="margin:16px 0 0;color:#856404;font-weight:bold;">⚠️ Platbu uhraďte do 48 hodín, inak bude rezervácia zrušená.</p>
          </div>

          <h2 style="color:#1b5e20;">📦 Obsah objednávky</h2>
          ${productListHtml}
          
          ${safe.discountCode ? `
            <div style="background:#e8f5e9;border:2px solid #4caf50;border-radius:10px;padding:15px;margin:16px 0;">
              <p style="margin:0;color:#2e7d32;font-weight:bold;font-size:16px;">
                🎉 Zľavový kód: ${safe.discountCode} (-${safe.discountPercent}%)
              </p>
              <p style="margin:4px 0 0;color:#2e7d32;font-size:14px;">
                Ušetrili ste: €${safe.discountAmount}
              </p>
            </div>
          ` : ''}
          
          <div style="background:#f5f5f5;border-radius:10px;padding:20px;margin:24px 0;">
            <h3 style="margin:0 0 12px;color:#333;">💰 Celková suma</h3>
            <p style="margin:4px 0;color:#555;"><strong>Medzisúčet:</strong> €${safe.subtotal}</p>
            ${safe.discountCode ? `<p style="margin:4px 0;color:#4caf50;font-weight:bold;">Zľava: -€${safe.discountAmount}</p>` : ''}
            <p style="margin:4px 0;color:#555;"><strong>Doprava:</strong> ${safe.shippingPrice === '0.00' ? '<span style="color:#4caf50;font-weight:bold;">ZADARMO ✅</span>' : '€' + safe.shippingPrice}</p>
            <p style="margin:16px 0 0;font-size:24px;font-weight:bold;color:#1565c0;">CELKOM: €${safe.totalPrice}</p>
          </div>

          <div style="background:#f5f5f5;border-radius:10px;padding:20px;margin:24px 0;">
            <h3 style="margin:0 0 12px;color:#333;">🚚 Doručenie</h3>
            <p style="margin:4px 0;color:#555;"><strong>Meno:</strong> ${safe.customerName}</p>
            <p style="margin:4px 0;color:#555;"><strong>Email:</strong> ${safe.customerEmail}</p>
            <p style="margin:4px 0;color:#555;"><strong>Telefón:</strong> ${safe.customerPhone}</p>
            <p style="margin:4px 0;color:#555;"><strong>Adresa:</strong> ${safe.customerStreet}, ${safe.customerZip} ${safe.customerCity}</p>
            <p style="margin:4px 0;color:#555;"><strong>Spôsob dopravy:</strong> ${safe.shippingMethod} ${safe.shippingPrice === '0.00' ? '<span style="color:#4caf50;font-weight:bold;">ZADARMO ✅</span>' : ''}</p>
          </div>

          <div style="background:#e3f2fd;border-radius:10px;padding:20px;margin:24px 0;text-align:center;">
            <p style="margin:0;color:#1565c0;font-size:14px;">
              Potrebujete pomoc? Kontaktujte nás:<br>
              📞 <strong>0949 344 600</strong><br>
              📧 <strong>phoneservissk@gmail.com</strong><br>
              🌐 <a href="https://fixanto.sk" style="color:#1565c0;text-decoration:none;font-weight:bold;">fixanto.sk</a>
            </p>
          </div>

          <p style="text-align:center;color:#999;font-size:12px;margin-top:32px;">
            Ďakujeme za vašu objednávku!<br>
            © 2024 Fixanto - Servis a predaj mobilov
          </p>
        </body>
        </html>
      `,
    });

    await transporter.sendMail({
      from: `"Fixanto Objednávky" <${process.env.GMAIL_USER}>`,
      to: process.env.GMAIL_USER,
      subject: `🔔 NOVÁ OBJEDNÁVKA #${safe.orderId}`,
      text: `NOVÁ OBJEDNÁVKA #${safe.orderId}\n${safe.customerName} | ${safe.customerEmail} | ${safe.customerPhone}\n${safe.customerStreet}, ${safe.customerZip} ${safe.customerCity}\n\n${productListText}\n\n${safe.discountCode ? `Zľava (${safe.discountCode} -${safe.discountPercent}%): -€${safe.discountAmount}\n` : ''}Doprava: ${safe.shippingMethod} ${safe.shippingPrice === '0.00' ? 'ZADARMO' : '€' + safe.shippingPrice}\nCelkom: €${safe.totalPrice}\nVS: ${safe.variableSymbol}\n\nČakáme na platbu do 48h!`,
      html: `
        <!DOCTYPE html>
        <html>
        <head><meta charset="UTF-8"></head>
        <body style="font-family:Arial,sans-serif;line-height:1.6;color:#333;padding:20px;">
          <div style="background:linear-gradient(135deg,#d32f2f 0%,#f44336 100%);color:white;padding:30px;border-radius:12px;margin-bottom:24px;">
            <h1 style="margin:0;font-size:28px;">🔔 NOVÁ OBJEDNÁVKA</h1>
            <p style="margin:8px 0 0;font-size:20px;">Číslo: <strong>#${safe.orderId}</strong></p>
          </div>

          <h2 style="color:#1b5e20;">👤 Zákazník</h2>
          <p style="margin:4px 0;"><strong>Meno:</strong> ${safe.customerName}</p>
          <p style="margin:4px 0;"><strong>Email:</strong> ${safe.customerEmail}</p>
          <p style="margin:4px 0;"><strong>Telefón:</strong> ${safe.customerPhone}</p>
          <p style="margin:4px 0;"><strong>Adresa:</strong> ${safe.customerStreet}, ${safe.customerZip} ${safe.customerCity}</p>

          <h2 style="color:#1b5e20;">📦 Produkty</h2>
          ${productListHtml}

          ${safe.discountCode ? `
            <div style="background:#fff3cd;border:2px solid #ffc107;border-radius:10px;padding:15px;margin:16px 0;">
              <p style="margin:0;color:#856404;font-weight:bold;">
                💰 Použitý zľavový kód: ${safe.discountCode} (-${safe.discountPercent}%)
              </p>
              <p style="margin:4px 0 0;color:#856404;">
                Zľava: €${safe.discountAmount}
              </p>
            </div>
          ` : ''}

          <h2 style="color:#1b5e20;">💰 Celková suma</h2>
          <p style="margin:4px 0;"><strong>Medzisúčet:</strong> €${safe.subtotal}</p>
          ${safe.discountCode ? `<p style="margin:4px 0;color:#4caf50;"><strong>Zľava (${safe.discountCode} -${safe.discountPercent}%):</strong> -€${safe.discountAmount}</p>` : ''}
          <p style="margin:4px 0;"><strong>Doprava:</strong> €${safe.shippingPrice}</p>
          <p style="margin:16px 0 0;font-size:20px;font-weight:bold;color:#1565c0;">CELKOM: €${safe.totalPrice}</p>

          <div style="background:#e3f2fd;border-radius:10px;padding:20px;margin:24px 0;">
            <p style="margin:0;"><strong>VS:</strong> ${safe.variableSymbol}</p>
            <p style="margin:8px 0 0;color:#d32f2f;font-weight:bold;">⏰ Čakáme na platbu do 48 hodín!</p>
          </div>
        </body>
        </html>
      `,
    });

    return {
      statusCode: 200,
      body: JSON.stringify({ success: true, message: 'Emails sent successfully' }),
    };
  } catch (error) {
    console.error('Email send error:', error);
    return {
      statusCode: 500,
      body: JSON.stringify({ success: false, error: error.message }),
    };
  }
};
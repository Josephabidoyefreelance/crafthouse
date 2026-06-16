const nodemailer = require('nodemailer');

const CONFIG = {
  gmailUser: 'crafthouse.systems@gmail.com',
  gmailPass: 'YOUR_GMAIL_APP_PASSWORD', // Replace with your Gmail App Password
  notifyEmail: 'crafthouse.systems@gmail.com',
  whatsappNumber: '2348058262947',
};

function getTransporter() {
  return nodemailer.createTransport({
    service: 'gmail',
    auth: { user: CONFIG.gmailUser, pass: CONFIG.gmailPass },
  });
}

function fmt(n) { return '&#8358;' + Number(n).toLocaleString('en-NG'); }

// ============================================
// NOTIFY BUSINESS — email + WhatsApp link
// ============================================
async function notifyOrder(order) {
  const delivery = order.total >= 500000 ? 0 : 15000;
  const grandTotal = order.total + delivery;

  const itemsList = order.items.map(i =>
    '* ' + i.name + ' (SKU: ' + i.sku + ') x' + i.qty + ' = ' + '&#8358;' + Number(i.price * i.qty).toLocaleString('en-NG')
  ).join('%0A');

  const waText =
    '&#128722; *NEW ORDER %23' + order.id + '*%0A%0A' +
    '*Customer:* ' + order.customer.firstName + ' ' + order.customer.lastName + '%0A' +
    '*Phone:* ' + order.customer.phone + '%0A' +
    '*Email:* ' + order.customer.email + '%0A' +
    '*Address:* ' + order.customer.address + ', ' + order.customer.city + ', ' + order.customer.state + '%0A%0A' +
    '*Items:*%0A' + order.items.map(i => '* ' + i.name + ' x' + i.qty).join('%0A') + '%0A%0A' +
    '*Total: ' + '&#8358;' + Number(grandTotal).toLocaleString('en-NG') + '*%0A' +
    '*Payment:* ' + order.paymentMethod;

  const waLink = 'https://wa.me/' + CONFIG.whatsappNumber + '?text=' + waText;

  const html = `
    <div style="font-family:Arial,sans-serif;max-width:600px;margin:0 auto">
      <div style="background:#1A1A1A;padding:24px;text-align:center">
        <h2 style="color:#B8933F;margin:0">New Order #${order.id}</h2>
        <p style="color:rgba(255,255,255,0.5);margin:4px 0 0;font-size:13px">${new Date(order.createdAt).toLocaleString('en-NG')}</p>
      </div>
      <div style="padding:28px;background:#f9f9f9">
        <h3 style="color:#1A1A1A;border-bottom:2px solid #B8933F;padding-bottom:8px">Customer</h3>
        <p><b>Name:</b> ${order.customer.firstName} ${order.customer.lastName}</p>
        <p><b>Phone:</b> ${order.customer.phone}</p>
        <p><b>Email:</b> ${order.customer.email}</p>
        <p><b>Address:</b> ${order.customer.address}, ${order.customer.city}, ${order.customer.state}</p>
        <h3 style="color:#1A1A1A;border-bottom:2px solid #B8933F;padding-bottom:8px;margin-top:24px">Items Ordered</h3>
        <table style="width:100%;border-collapse:collapse">
          <tr style="background:#1A1A1A;color:white">
            <th style="padding:10px;text-align:left">Product</th>
            <th style="padding:10px;text-align:left">SKU</th>
            <th style="padding:10px;text-align:center">Qty</th>
            <th style="padding:10px;text-align:right">Total</th>
          </tr>
          ${order.items.map((item, i) => `
          <tr style="background:${i%2===0?'white':'#f5f5f5'}">
            <td style="padding:10px;font-size:13px">${item.name}</td>
            <td style="padding:10px;font-size:12px;color:#888">${item.sku}</td>
            <td style="padding:10px;text-align:center">${item.qty}</td>
            <td style="padding:10px;text-align:right;font-weight:bold">&#8358;${Number(item.price * item.qty).toLocaleString('en-NG')}</td>
          </tr>`).join('')}
          <tr style="background:#fff8ee">
            <td colspan="3" style="padding:10px;font-weight:bold">Delivery</td>
            <td style="padding:10px;text-align:right">${delivery===0?'Free':'&#8358;'+Number(delivery).toLocaleString('en-NG')}</td>
          </tr>
          <tr style="background:#B8933F;color:white">
            <td colspan="3" style="padding:12px;font-weight:bold;font-size:16px">TOTAL</td>
            <td style="padding:12px;text-align:right;font-weight:bold;font-size:16px">&#8358;${Number(grandTotal).toLocaleString('en-NG')}</td>
          </tr>
        </table>
        <p style="margin-top:16px"><b>Payment:</b> ${order.paymentMethod}</p>
        <div style="text-align:center;margin-top:24px">
          <a href="${waLink}" style="background:#25D366;color:white;padding:14px 28px;text-decoration:none;font-weight:bold;border-radius:4px;display:inline-block">
            &#128241; Open in WhatsApp
          </a>
        </div>
      </div>
      <div style="background:#1A1A1A;padding:16px;text-align:center">
        <p style="color:rgba(255,255,255,0.4);font-size:12px;margin:0">Crafthouse Kitchen Systems & Appliances</p>
      </div>
    </div>`;

  try {
    await getTransporter().sendMail({
      from: '"Crafthouse Kitchen" <' + CONFIG.gmailUser + '>',
      to: CONFIG.notifyEmail,
      subject: '&#128722; New Order #' + order.id + ' — ' + order.customer.firstName + ' ' + order.customer.lastName,
      html,
    });
    console.log('Business order email sent #' + order.id);
  } catch (err) {
    console.error('Business email error:', err.message);
  }

  return waLink;
}

// ============================================
// NOTIFY CUSTOMER — order confirmation email
// ============================================
async function notifyCustomer(order) {
  const delivery = order.total >= 500000 ? 0 : 15000;
  const grandTotal = order.total + delivery;

  const html = `
    <div style="font-family:Arial,sans-serif;max-width:600px;margin:0 auto">
      <div style="background:#1A1A1A;padding:32px;text-align:center">
        <img src="https://i.imgur.com/placeholder.png" alt="Crafthouse Kitchen" style="height:50px;margin-bottom:16px" onerror="this.style.display='none'">
        <h2 style="color:#B8933F;margin:0;font-size:26px">Order Confirmed!</h2>
        <p style="color:rgba(255,255,255,0.6);margin:8px 0 0">Thank you for your order, ${order.customer.firstName}.</p>
      </div>
      <div style="padding:32px;background:#f9f9f9">
        <div style="background:white;border:1px solid #e5e0d8;padding:20px;text-align:center;margin-bottom:28px">
          <p style="font-size:12px;color:#888;margin:0 0 6px;letter-spacing:1px;text-transform:uppercase">Your Order ID</p>
          <p style="font-size:32px;font-weight:700;color:#B8933F;margin:0;font-family:Georgia,serif">#${order.id}</p>
          <p style="font-size:12px;color:#888;margin:8px 0 0">Keep this for reference when contacting us</p>
        </div>

        <h3 style="color:#1A1A1A;border-bottom:2px solid #B8933F;padding-bottom:8px">Items Ordered</h3>
        ${order.items.map(item => `
        <div style="display:flex;justify-content:space-between;padding:12px 0;border-bottom:1px solid #eee;font-size:14px">
          <span>${item.name} <span style="color:#888">x${item.qty}</span></span>
          <strong>&#8358;${Number(item.price * item.qty).toLocaleString('en-NG')}</strong>
        </div>`).join('')}
        <div style="display:flex;justify-content:space-between;padding:10px 0;font-size:14px;color:#888">
          <span>Delivery</span><span>${delivery===0?'Free':'&#8358;'+Number(delivery).toLocaleString('en-NG')}</span>
        </div>
        <div style="display:flex;justify-content:space-between;padding:14px 0;font-size:18px;font-weight:bold;border-top:2px solid #1A1A1A;margin-top:4px">
          <span>Total</span><span style="color:#B8933F">&#8358;${Number(grandTotal).toLocaleString('en-NG')}</span>
        </div>

        <h3 style="color:#1A1A1A;border-bottom:2px solid #B8933F;padding-bottom:8px;margin-top:24px">Delivery Address</h3>
        <p style="font-size:14px;color:#555;line-height:1.8">${order.customer.address}<br>${order.customer.city}, ${order.customer.state}</p>

        <h3 style="color:#1A1A1A;border-bottom:2px solid #B8933F;padding-bottom:8px;margin-top:24px">Payment</h3>
        <p style="font-size:14px;color:#555">${order.paymentMethod}</p>
        ${order.paymentMethod === 'bank-transfer' ? `
        <div style="background:#fff8ee;border:1px solid #B8933F;padding:16px;margin-top:8px">
          <p style="font-size:13px;color:#555;margin:0;line-height:1.8">
            <b>Bank:</b> First Bank<br>
            <b>Account:</b> 1234567890<br>
            <b>Name:</b> Sixth Column Limited<br>
            <b>Amount:</b> &#8358;${Number(grandTotal).toLocaleString('en-NG')}<br>
            <b>Reference:</b> ${order.id}
          </p>
        </div>` : ''}

        <div style="text-align:center;margin-top:32px">
          <p style="font-size:13px;color:#888">Questions? Contact us:</p>
          <a href="https://wa.me/2348058262947" style="background:#25D366;color:white;padding:12px 24px;text-decoration:none;font-weight:bold;border-radius:4px;display:inline-block;margin:8px">
            &#128241; WhatsApp: 08058262947
          </a>
          <a href="mailto:crafthouse.systems@gmail.com" style="background:#1A1A1A;color:white;padding:12px 24px;text-decoration:none;font-weight:bold;border-radius:4px;display:inline-block;margin:8px">
            &#9993; Email Us
          </a>
        </div>
      </div>
      <div style="background:#1A1A1A;padding:16px;text-align:center">
        <p style="color:rgba(255,255,255,0.4);font-size:12px;margin:0">Crafthouse Kitchen Systems & Appliances | crafthouse.systems@gmail.com</p>
      </div>
    </div>`;

  try {
    await getTransporter().sendMail({
      from: '"Crafthouse Kitchen" <' + CONFIG.gmailUser + '>',
      to: order.customer.email,
      subject: 'Order Confirmed #' + order.id + ' — Crafthouse Kitchen',
      html,
    });
    console.log('Customer email sent to ' + order.customer.email);
  } catch (err) {
    console.error('Customer email error:', err.message);
  }
}

// ============================================
// NOTIFY BUSINESS — contact form
// ============================================
async function notifyContact(data) {
  const { name, email, phone, message } = data;
  const waText = encodeURIComponent(
    '📩 WEBSITE ENQUIRY\n\nName: ' + name + '\nEmail: ' + email +
    '\nPhone: ' + (phone||'Not provided') + '\n\nMessage:\n' + message
  );
  const waLink = 'https://wa.me/' + CONFIG.whatsappNumber + '?text=' + waText;

  const html = `
    <div style="font-family:Arial,sans-serif;max-width:600px;margin:0 auto">
      <div style="background:#1A1A1A;padding:24px;text-align:center">
        <h2 style="color:#B8933F;margin:0">New Website Enquiry</h2>
      </div>
      <div style="padding:28px;background:#f9f9f9">
        <p><b>Name:</b> ${name}</p>
        <p><b>Email:</b> <a href="mailto:${email}">${email}</a></p>
        <p><b>Phone:</b> ${phone||'Not provided'}</p>
        <div style="background:white;border-left:4px solid #B8933F;padding:16px;margin-top:16px">
          <p style="margin:0;line-height:1.8">${message.replace(/\n/g,'<br>')}</p>
        </div>
        <div style="text-align:center;margin-top:24px">
          <a href="${waLink}" style="background:#25D366;color:white;padding:14px 28px;text-decoration:none;font-weight:bold;border-radius:4px;display:inline-block;margin:6px">
            &#128241; Reply on WhatsApp
          </a>
          <a href="mailto:${email}" style="background:#1A1A1A;color:white;padding:14px 28px;text-decoration:none;font-weight:bold;border-radius:4px;display:inline-block;margin:6px">
            &#9993; Reply by Email
          </a>
        </div>
      </div>
    </div>`;

  try {
    await getTransporter().sendMail({
      from: '"Crafthouse Kitchen" <' + CONFIG.gmailUser + '>',
      to: CONFIG.notifyEmail,
      subject: '📩 New Enquiry from ' + name,
      html,
    });
    console.log('Contact email sent from ' + name);
  } catch (err) {
    console.error('Contact email error:', err.message);
  }

  return waLink;
}

module.exports = { notifyOrder, notifyCustomer, notifyContact };

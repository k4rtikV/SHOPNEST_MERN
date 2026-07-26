const escapeHtml = (value = '') =>
    String(value)
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&#039;');

const formatCurrency = (amount) => {
    const numericAmount = Number(amount);

    if (!Number.isFinite(numericAmount)) {
        return '₹0.00';
    }

    return new Intl.NumberFormat('en-IN', {
        style: 'currency',
        currency: 'INR',
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
    }).format(numericAmount);
};

const emailShell = ({ preheader, title, greeting, body }) => `
<!doctype html>
<html lang="en">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta name="color-scheme" content="light only">
    <title>${escapeHtml(title)}</title>
</head>
<body style="margin:0;padding:0;background:#f4f5f7;font-family:Arial,Helvetica,sans-serif;color:#18181b;">
    <div style="display:none;max-height:0;overflow:hidden;opacity:0;color:transparent;">
        ${escapeHtml(preheader)}
    </div>

    <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="background:#f4f5f7;">
        <tr>
            <td align="center" style="padding:32px 14px;">
                <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="max-width:620px;background:#ffffff;border-radius:18px;overflow:hidden;box-shadow:0 12px 32px rgba(24,24,27,0.10);">
                    <tr>
                        <td style="padding:28px 32px;background:#ff6417;background-image:linear-gradient(135deg,#ff7715 0%,#ff3f4a 100%);">
                            <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0">
                                <tr>
                                    <td style="font-size:28px;line-height:1;font-weight:800;color:#ffffff;letter-spacing:-0.5px;">ShopNest<span style="color:#ffd1bd;">.</span></td>
                                    <td align="right" style="font-size:12px;line-height:1.4;color:#fff4ee;">Premium E-commerce Platform</td>
                                </tr>
                            </table>
                        </td>
                    </tr>

                    <tr>
                        <td style="padding:36px 32px 8px;">
                            <h1 style="margin:0 0 14px;font-size:27px;line-height:1.25;color:#111827;">${escapeHtml(title)}</h1>
                            <p style="margin:0;font-size:16px;line-height:1.7;color:#4b5563;">${greeting}</p>
                        </td>
                    </tr>

                    <tr>
                        <td style="padding:18px 32px 38px;">
                            ${body}
                        </td>
                    </tr>

                    <tr>
                        <td style="padding:26px 32px;background:#0b0b0d;text-align:center;">
                            <p style="margin:0 0 8px;font-size:16px;font-weight:700;color:#ff6b19;">ShopNest</p>
                            <p style="margin:0;font-size:12px;line-height:1.65;color:#a1a1aa;">
                                This is an automated transactional email. Please do not share verification codes or payment details with anyone.
                            </p>
                            <p style="margin:10px 0 0;font-size:12px;color:#71717a;">© ${new Date().getFullYear()} ShopNest. All rights reserved.</p>
                        </td>
                    </tr>
                </table>
            </td>
        </tr>
    </table>
</body>
</html>`;

const registrationOtpEmail = ({ name, otp }) => {
    const safeName = escapeHtml(name || 'ShopNest customer');
    const safeOtp = escapeHtml(otp);

    return {
        subject: 'Welcome to ShopNest - Registration OTP',
        text: `Welcome to ShopNest, ${name}!\n\nYour registration OTP is: ${otp}\n\nDo not share this code with anyone.\n\nThank you for registering with ShopNest.`,
        html: emailShell({
            preheader: `Your ShopNest registration code is ${otp}`,
            title: 'Verify your ShopNest account',
            greeting: `Hello <strong style="color:#18181b;">${safeName}</strong>, welcome to ShopNest! Use the verification code below to complete your registration.`,
            body: `
                <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0">
                    <tr>
                        <td align="center" style="padding:8px 0 24px;">
                            <div style="display:inline-block;padding:22px 30px;border:1px solid #fed7c3;border-radius:16px;background:#fff7f2;">
                                <p style="margin:0 0 8px;font-size:12px;font-weight:700;letter-spacing:1.6px;text-transform:uppercase;color:#9a3412;">Registration OTP</p>
                                <p style="margin:0;font-family:'Courier New',monospace;font-size:38px;line-height:1;font-weight:800;letter-spacing:9px;color:#ea580c;">${safeOtp}</p>
                            </div>
                        </td>
                    </tr>
                </table>

                <div style="padding:16px 18px;border-radius:12px;background:#f8fafc;border-left:4px solid #ff6417;">
                    <p style="margin:0;font-size:14px;line-height:1.65;color:#475569;">
                        Enter this code in ShopNest to verify your account. For your security, never share this OTP with anyone.
                    </p>
                </div>

                <p style="margin:24px 0 0;font-size:15px;line-height:1.7;color:#4b5563;">
                    Thank you for joining ShopNest. We hope you enjoy a smooth and secure shopping experience.
                </p>
            `
        })
    };
};

const orderCreatedEmail = ({ customerName, order }) => {
    const address = order.address || {};
    const items = Array.isArray(order.items) ? order.items : [];
    const itemCount = items.reduce((sum, item) => sum + Number(item.qty || 0), 0);

    const itemRows = items.map((item, index) => {
        const productName = item.productId?.name || `Product ${index + 1}`;
        const quantity = Number(item.qty || 0);
        const price = Number(item.price || 0);
        const subtotal = price * quantity;

        return `
            <tr>
                <td style="padding:13px 0;border-bottom:1px solid #ececf0;font-size:14px;color:#27272a;">${escapeHtml(productName)}</td>
                <td align="center" style="padding:13px 8px;border-bottom:1px solid #ececf0;font-size:14px;color:#52525b;">${quantity}</td>
                <td align="right" style="padding:13px 0;border-bottom:1px solid #ececf0;font-size:14px;font-weight:700;color:#27272a;">${escapeHtml(formatCurrency(subtotal))}</td>
            </tr>`;
    }).join('');

    const safeName = escapeHtml(customerName || address.fullName || 'Customer');
    const orderId = escapeHtml(order._id);
    const paymentId = order.paymentId ? escapeHtml(order.paymentId) : 'Not available';

    return {
        subject: `ShopNest Order Confirmed - ${orderId}`,
        text: `Dear ${customerName},\n\nThank you for your order!\n\nOrder ID: ${order._id}\nTotal Amount: ${formatCurrency(order.totalAmount)}\nItems: ${itemCount}\nPayment ID: ${order.paymentId || 'Not available'}\n\nShipping Address:\n${address.fullName}\n${address.street}\n${address.city} - ${address.postalCode}\n${address.country}\n\nWe will notify you once your order is shipped.\n\nBest regards,\nShopNest Team`,
        html: emailShell({
            preheader: `Your ShopNest order ${order._id} has been created successfully.`,
            title: 'Your order is confirmed!',
            greeting: `Dear <strong style="color:#18181b;">${safeName}</strong>, thank you for your order. We have received it and will notify you when it is shipped.`,
            body: `
                <div style="margin-bottom:22px;padding:18px;border-radius:14px;background:#fff7f2;border:1px solid #fed7c3;">
                    <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0">
                        <tr>
                            <td style="font-size:12px;text-transform:uppercase;letter-spacing:1px;color:#9a3412;">Order ID</td>
                            <td align="right" style="font-size:12px;text-transform:uppercase;letter-spacing:1px;color:#9a3412;">Status</td>
                        </tr>
                        <tr>
                            <td style="padding-top:7px;font-size:15px;font-weight:700;color:#27272a;word-break:break-all;">${orderId}</td>
                            <td align="right" style="padding-top:7px;"><span style="display:inline-block;padding:6px 10px;border-radius:999px;background:#dcfce7;font-size:12px;font-weight:700;color:#166534;">Confirmed</span></td>
                        </tr>
                    </table>
                </div>

                <h2 style="margin:0 0 8px;font-size:18px;color:#18181b;">Order summary</h2>
                <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0">
                    <tr>
                        <th align="left" style="padding:10px 0;border-bottom:2px solid #e4e4e7;font-size:12px;text-transform:uppercase;letter-spacing:.7px;color:#71717a;">Item</th>
                        <th align="center" style="padding:10px 8px;border-bottom:2px solid #e4e4e7;font-size:12px;text-transform:uppercase;letter-spacing:.7px;color:#71717a;">Qty</th>
                        <th align="right" style="padding:10px 0;border-bottom:2px solid #e4e4e7;font-size:12px;text-transform:uppercase;letter-spacing:.7px;color:#71717a;">Subtotal</th>
                    </tr>
                    ${itemRows}
                    <tr>
                        <td colspan="2" align="right" style="padding:18px 12px 0 0;font-size:15px;font-weight:700;color:#52525b;">Total paid</td>
                        <td align="right" style="padding:18px 0 0;font-size:20px;font-weight:800;color:#ea580c;">${escapeHtml(formatCurrency(order.totalAmount))}</td>
                    </tr>
                </table>

                <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="margin-top:28px;">
                    <tr>
                        <td valign="top" width="50%" style="padding-right:8px;">
                            <div style="min-height:132px;padding:18px;border-radius:12px;background:#f8fafc;border:1px solid #e2e8f0;">
                                <p style="margin:0 0 9px;font-size:13px;font-weight:700;text-transform:uppercase;letter-spacing:.7px;color:#475569;">Shipping address</p>
                                <p style="margin:0;font-size:14px;line-height:1.65;color:#334155;">
                                    ${escapeHtml(address.fullName)}<br>
                                    ${escapeHtml(address.street)}<br>
                                    ${escapeHtml(address.city)} - ${escapeHtml(address.postalCode)}<br>
                                    ${escapeHtml(address.country)}
                                </p>
                            </div>
                        </td>
                        <td valign="top" width="50%" style="padding-left:8px;">
                            <div style="min-height:132px;padding:18px;border-radius:12px;background:#f8fafc;border:1px solid #e2e8f0;">
                                <p style="margin:0 0 9px;font-size:13px;font-weight:700;text-transform:uppercase;letter-spacing:.7px;color:#475569;">Payment details</p>
                                <p style="margin:0 0 8px;font-size:14px;line-height:1.55;color:#334155;"><strong>Payment ID:</strong></p>
                                <p style="margin:0;font-size:12px;line-height:1.55;color:#64748b;word-break:break-all;">${paymentId}</p>
                                <p style="margin:10px 0 0;font-size:14px;color:#334155;"><strong>${itemCount}</strong> item${itemCount === 1 ? '' : 's'} ordered</p>
                            </div>
                        </td>
                    </tr>
                </table>

                <p style="margin:24px 0 0;font-size:14px;line-height:1.7;color:#64748b;">
                    Keep this email for your records. Your order can also be viewed from the My Orders section of your ShopNest account.
                </p>
            `
        })
    };
};

module.exports = {
    registrationOtpEmail,
    orderCreatedEmail
};

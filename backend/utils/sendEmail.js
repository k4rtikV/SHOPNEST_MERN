const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
    },
    connectionTimeout: 10000,
    greetingTimeout: 10000,
    socketTimeout: 10000
});

const sendEmail = async (to, subject, text) => {
    await transporter.sendMail({
        from: `"ShopNest" <${process.env.EMAIL_USER}>`,
        to,
        subject,
        text
    });
};

module.exports = sendEmail;
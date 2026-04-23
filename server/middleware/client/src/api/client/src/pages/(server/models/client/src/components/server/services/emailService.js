const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
    service: 'gmail', // Or your preferred SMTP
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
    }
});

exports.sendVerificationEmail = async (email, code) => {
    const mailOptions = {
        from: '"@wxl_e Trading Academy" <noreply@wxl-e.com>',
        to: email,
        subject: '🚀 Your Gateway to Financial Freedom Starts Here',
        html: `
            <div style="font-family: sans-serif; background: #0f172a; color: #ffffff; padding: 40px; border-radius: 10px;">
                <h1 style="color: #10b981;">Welcome to the Elite,</h1>
                <p style="font-size: 18px;">You're one step away from mastering the markets.</p>
                <div style="background: #1e293b; padding: 20px; text-align: center; border-radius: 8px; margin: 20px 0;">
                    <span style="font-size: 32px; font-weight: bold; letter-spacing: 5px; color: #10b981;">${code}</span>
                </div>
                <p>Enter this code to verify your account and claim your <b>$10,000 virtual trading capital</b>.</p>
                <hr style="border: 0; border-top: 1px solid #334155; margin: 20px 0;">
                <p style="font-size: 12px; color: #94a3b8;">© 2026 @wxl_e Trading Platforms. All rights reserved.</p>
            </div>
        `
    };
    return transporter.sendMail(mailOptions);
};

router.post('/send-code', async (req, res) => {
    const { email } = req.body;
    const code = Math.floor(100000 + Math.random() * 900000).toString();
    
    // 1. Save to Verification DB
    await Verification.create({ email, code });
    
    // 2. Send Email
    await sendVerificationEmail(email, code);
    
    res.json({ message: "Verification code sent!" });
});

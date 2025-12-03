const express = require("express");
const axios = require("axios");
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ===== YOUR VALUES =====
const APP_ID = "1971465743497236480";
const DEV_KEY = "t6pog83605764b14fafbb9";
const DEV_SECRET = "evcdc4abq9gew2729dv2k1c9";
// ========================

// SEND OTP
app.post("/send-otp", async (req, res) => {
    const phone = req.body.phone;
    const otp = Math.floor(100000 + Math.random() * 900000);

    const payload = {
        appId: APP_ID,
        templateId: TEMPLATE_ID_1,
        phone: phone,
        params: { code: otp }
    };

    try {
        const response = await axios.post(
            "https://api.engagelab.com/v1/otp/send",
            payload,
            {
                headers: {
                    "Content-Type": "application/json",
                    "X-APP-KEY": DEV_KEY,
                    "X-APP-SECRET": DEV_SECRET
                }
            }
        );

        console.log("OTP Sent:", response.data);
        res.json({ success: true, otp: otp });

    } catch (error) {
        console.error("Error:", error.response?.data || error);
        res.status(500).json({ success: false, error: "OTP sending failed!" });
    }
});

app.listen(3000, () => {
    console.log("Server running on port 3000");
});

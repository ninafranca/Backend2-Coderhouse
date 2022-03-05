import dotenv from "dotenv";
dotenv.config();

export default {
    MONGO_SESSIONS: process.env.MONGO_SESSIONS,
    MONGO_ECOMMERCE:  process.env.MONGO_ECOMMERCE,
    FIREBASE: process.env.FIREBASE,
    NGROK_NO_CALLBACK: process.env.NGROK_NO_CALLBACK,
    NGROK_CALLBACK: process.env.NGROK_CALLBACK,
    FACEBOOK_ID: process.env.FACEBOOK_ID,
    FACEBOOK_SECRET: process.env.FACEBOOK_SECRET,
    GMAIL_PASS: process.env.GMAIL_PASS,
    TWILIO_TRIAL: process.env.TWILIO_TRIAL,
    TWILIO_VERIFIED: process.env.TWILIO_VERIFIED,
    TWILIO_TOKEN: process.env.TWILIO_TOKEN,
    TWILIO_SID: process.env.TWILIO_SID,
}
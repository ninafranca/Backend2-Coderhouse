import twilio from "twilio";
import config from "./envConfig.js";

const sid = "AC1ffaafaae7cfad83a0e50c63ce0e5395";
const token = "d3810f5790f29e09a9aa503e27b6c12f";
const client = twilio(sid, token);

try {
    const message = await client.messages.create({
        body: "Prueba de Twilio",
        from: "+18623565624",
        to: "+541149707900"
    });
    console.log(message);
} catch(error) {
    console.log(error);
}
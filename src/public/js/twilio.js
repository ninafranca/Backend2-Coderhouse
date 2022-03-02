import twilio from "twilio";
import config from "./envConfig.js";

const sid = "AC1ffaafaae7cfad83a0e50c63ce0e5395";
const token = "afe5f22f5ca6254aeb1a071552a17c62";
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
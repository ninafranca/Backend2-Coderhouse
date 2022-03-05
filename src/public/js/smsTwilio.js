import twilio from "twilio";
import config from "./envConfig.js";
import createLogger from "./winston.js";

const sid = "AC1ffaafaae7cfad83a0e50c63ce0e5395";
const token = "d3810f5790f29e09a9aa503e27b6c12f";
const client = twilio(sid, token);
const logger = createLogger(process.env.NODE_ENV);

try {
    const message = await client.messages.create({
        body: "Prueba de Twilio",
        from: "+18623565624",
        to: "+541149707900"
    });
    logger.info(`Sms enviado: ${message}`);
    //console.log(message);
} catch(error) {
    logger.error(`Fallo al enviar sms: ${error}`);
    console.log(error);
}
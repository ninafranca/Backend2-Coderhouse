import twilio from "twilio";
import createLogger from "./logger.js";

const sid = process.env.TWILIO_SID;
const token = process.env.TWILIO_TOKEN;
const client = twilio(sid, token);
const logger = createLogger(process.env.NODE_ENV);

try {
    let result = await client.messages.create({
        from: process.env.TWILIO_WHATSAPP,
        to: process.env.TWILIO_WHATSAPP_VERIFIED,
        body: "Prueba de Whatsapp con Twilio",
        //Para enviar imágenes puedo poner coma y adjuntar más// 
        mediaUrl: ["https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQZe8xjSlSEI8a1SK92Jay9sPqJXumdLkVAAg&usqp=CAU"]
    })
    logger.info(`Whatsapp enviado: ${result}`);
    //console.log(result);
} catch(error) {
    logger.error(`Ha fallado el envío de whatsapp: ${error}`);
    //console.log(error);
}
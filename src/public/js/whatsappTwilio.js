import twilio from "twilio";
import config from "./envConfig.js";

const sid = "AC1ffaafaae7cfad83a0e50c63ce0e5395";
const token = "d3810f5790f29e09a9aa503e27b6c12f";
const client = twilio(sid, token);

try {
    let result = await client.messages.create({
        from: "whatsapp:+14155238886",
        to: "whatsapp:+5491149707900",
        body: "Prueba de Whatsapp con Twilio",
        //Para enviar imágenes puedo poner coma y adjuntar más// 
        mediaUrl: ["https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQZe8xjSlSEI8a1SK92Jay9sPqJXumdLkVAAg&usqp=CAU"]
    })
    console.log(result);
} catch(error) {
    console.log(error);
}
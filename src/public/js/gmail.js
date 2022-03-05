import {createTransport} from "nodemailer";
import config from "./envConfig.js";
import createLogger from "./winston.js";

const logger = createLogger(process.env.NODE_ENV);

const transport = createTransport({
    service: "gmail",
    port: 587,
    auth: {
        user: "info.cocospasteleria@gmail.com",
        pass: "rppqrirqkntmmvep"
    }
});

const mail = {
    from: "Nina",
    to: "ninafspin@gmail.com",
    subject: "Prueba",
    html: `
        <h1 style="color:#AD95B4">Prueba de correo</h1>
    `
}

try {
    const result = await transport.sendMail(mail);
    logger.info(`E-mail enviado: ${result}`);
    //console.log(result);
} catch(error) {
    logger.error("Error enviando e-mail");
    console.log(error);
}
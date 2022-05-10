import Chats from "../model/Chats.js";
import GenericQueries from "./genericQueries.js";
import createLogger from "../public/js/logger.js";
import {envConfig} from "../config/envConfig.js";
import {normalize, denormalize, schema} from "normalizr";

const logger = createLogger(envConfig.NODE_ENV)

export default class ChatsService extends GenericQueries {

    constructor(dao) {
        super(dao, Chats.model)
    }
    
    async getAllMessages() {
        try {
            const readFile = await this.dao.models[Chats.model].find();
            if(!readFile) {
                logger.error(error.message);
                return {status: "error", message: "No hay mensajes"};
            } else {
                return {status: "success", payload: readFile};
            } 
        } catch(error) {
            logger.error(error.message);
            return {status: "error", message: "Error leyendo los mensajes"};
        }
    }

    async saveMessage(message) {
        try {
            const readFile = await this.dao.models[Chats.model].find();
            if(!readFile) {
                await this.dao.models[Chats.model].create();
                await this.dao.models[Chats.model].create(message);
            } else {
                await this.dao.models[Chats.model].create(message);
                let id = 1
                for (let message of readFile) {
                    message.id = id
                    id++
                }
                const data= {
                    "id": id,
                    "mensajes": JSON.parse(JSON.stringify(readFile))
                }
                const authorSchema = new schema.Entity("authors")
                const messageSchema = new schema.Entity("messages",{
                    author: authorSchema
                })
                const chatSchema = new schema.Entity("chats", {
                    author: authorSchema,
                    mensajes: [messageSchema]
                })
                const normalizedData= normalize(data,chatSchema)
                //const denormalizedData = denormalize(data.result, chatSchema, data.entities);
                return {status: "success", payload: normalizedData};
            }
        } catch(error) {
            logger.error(error.message);
            return {status: "error", message: "No se ha podido guardar el mensaje"};
        }
    }

}
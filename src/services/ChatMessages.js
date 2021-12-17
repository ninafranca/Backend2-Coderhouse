//import database from ("../db/ecommerce.sqlite");
const database = require("../public/js/config");

class ChatMessages {
    constructor() {
        database.schema.hasTable("chats").then(res => {
            if (!res) {
                database.schema.createTable("chats", table => {
                    table.increments(),
                    table.string("email").notNullable(),
                    table.timestamp("true, true"),
                    table.string("message").notNullable()
                }).then(res => {
                    console.log("Tabla de chats creada");
                }).catch( res => {
                    return {status: "error", message: "Error con la tabla de chats"}
                })
            }
        })
    }

    async getAllMessages() {
        try {
            let chat = await database.select().table("chats");
            return {status: "success", payload: chat}
        } catch (error) {
            return {status: "error", message: "Error al buscar el chat"}
        }
    }

    async saveMessage(message) {
        try {
            let chat = await database.select().table("chats");
            if(!chat) {
                return {status: "error", message: "Error con el chat"}
            } else {
                let result = chat.insert(message);
                return {status: "success", payload: result}
            }
        } catch (error) {
            return {status: "error", message: "Error al guardar mensaje"}
        }
    }
}

module.exports = ChatMessages;
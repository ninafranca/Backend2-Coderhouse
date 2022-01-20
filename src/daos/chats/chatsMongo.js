import MongoContenedor from "../../contenedor/MongoContenedor.js";

export default class ChatsMongo extends MongoContenedor {

    constructor() {
        super(
            "chats",
            {
                author: {
                    email: {type: String},
                    first_name: {type: String, required: false},
                    last_name: {type: String, required: false},
                    age: {type: Number, required: false},
                    alias: {type: String, required: false},
                    avatar: {type: String, required: false}
                },
                text: {type: String},
            },
            {timestamps: true}
        )
    }
    
}
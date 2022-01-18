import Schema from "mongoose";
import MongoContenedor from "../../contenedor/MongoContenedor.js";

export default class ChatsMongo extends MongoContenedor {

    constructor() {
        super(
            "chats",
            {
                author: {
                    id: {type: String, required: true},
                    first_name: {type: String, required: false},
                    last_name: {type: String, required: false},
                    age: {type: Number, required: false},
                    alias: {type: String, required: false},
                    avatar: {type: String, required: false}
                }
            },
            {
                text: {
                    type: [{
                        type: Schema.Types.ObjectId,
                        required: true,
                        ref: "text"
                    }],
                    default: []
                }
            },
            {timestamps: true}
        )
    }
    
}
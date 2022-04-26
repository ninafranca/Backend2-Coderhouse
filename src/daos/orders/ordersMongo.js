import Schema from "mongoose";
import MongoContenedor from "../../contenedor/MongoContenedor.js";

export default class OrdersMongo extends MongoContenedor {

    constructor() {
        super(
            "orders",
            {
                cart: {
                    type: [{
                        type: String,
                        ref: "carts"
                    }],
                    default: []
                },
                user: { 
                    type: String, 
                    ref: "users", 
                    unique: true 
                }
            },
            {timestamps: true}
        )
    }

}
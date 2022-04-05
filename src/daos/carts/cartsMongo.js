import Schema from "mongoose";
import MongoContenedor from "../../contenedor/MongoContenedor.js";

export default class CartsMongo extends MongoContenedor {

    constructor() {
        super(
            "carts",
            {
                products: {
                    type: [{
                        type: Schema.Types.ObjectId,
                        ref: "products"
                    }],
                    default: []
                },
                user: { 
                    type: Schema.Types.ObjectId, 
                    ref: "user", 
                    unique: true 
                }
            },
            {timestamps: true}
        )
    }

}
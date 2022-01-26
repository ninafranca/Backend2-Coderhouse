import MongoContenedor from "../../contenedor/MongoContenedor.js";

export default class UsersMongo extends MongoContenedor {

    constructor() {
        super(
            "users",
            {
                user: {
                    email: {type: String},
                    name: {type: String}
                }
            },
            {timestamps: true}
        )
    }

}



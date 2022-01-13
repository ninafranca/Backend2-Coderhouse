import __dirname from "../../utils.js";

export default {
    fileSystem: {
        baseUrl: __dirname + "/files/"
    },
    mongo: {
        baseUrl: "mongodb+srv://Nina:123@ecommerce.b23tg.mongodb.net/ecommerce?retryWrites=true&w=majority"
    },
    firebase: {
        baseUrl: "https://ecommerce-f628b.firebaseio.com"
    }
}
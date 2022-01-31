import __dirname from "../../utils.js";
import config from "./envConfig.js";

export default {
    fileSystem: {
        baseUrl: __dirname + "/files/"
    },
    mongo: {
        baseUrl: config.MONGO_ECOMMERCE
    },
    firebase: {
        baseUrl: config.FIREBASE
    }
}
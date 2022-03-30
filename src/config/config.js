import __dirname from "../utils.js";
import {envConfig} from "./envConfig.js";

export default {
    fileSystem: {
        baseUrl: __dirname + "/files/"
    },
    mongo: {
        baseUrl: envConfig.MONGO_ECOMMERCE
    },
    firebase: {
        baseUrl: envConfig.FIREBASE
    }
}
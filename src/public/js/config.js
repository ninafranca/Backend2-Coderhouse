import knex from "knex";
import __dirname from "../../utils.js";

const database = knex({
    client: "sqlite3",
    connection: {filename: "./src/db/ecommerce.sqlite"}
});

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

//export default database;
import knex from "knex";
import __dirname from "../../utils.js";

const database = knex({
    client: "sqlite3",
    connection: {filename: "./src/db/ecommerce.sqlite"}
});

export default {
    fileSystem: {
        baseUrl: __dirname + "/files/"
    }
}

//export default database;
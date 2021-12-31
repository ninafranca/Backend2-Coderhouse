const knex = require("knex");
//const __dirname = require("./utils");
//import knex from "knex":
//import __dirname from "./utils.js";

const database = knex({
    client: "sqlite3",
    connection: {filename: "./src/db/ecommerce.sqlite"}
});

const fileSystem = {
    fileSystem: {
        baseUrl: "../../files"
    }
}

module.exports = database, fileSystem;
//import database from ("../db/ecommerce.sqlite");
const database = require("../public/js/config");
const makeId = require("../public/js/utils");

class Products {

    constructor() {
        database.schema.hasTable("products").then(res => {
            if (!res) {
                database.schema.createTable("products", table => {
                    table.increments();
                    table.string("title").notNullable();
                    table.integer("price").notNullable();
                    table.timestamps(true, true);
                    table.string("description").defaultTo("Sin descripción.");
                    table.string("code").defaultTo(makeId(5));
                    table.string("thumbnail").defaultTo("https://media.istockphoto.com/vectors/image-place-holder-with-a-gray-camera-icon-vector-id1226328537?k=20&m=1226328537&s=612x612&w=0&h=2klft8QdMSyDj3oAmFyRyD24Mogj2OygLWrX9Lk6oGQ=");
                    table.integer("stock").defaultTo(0);
                }).then(res => {
                    console.log("Tabla de productos creada");
                }).catch( res => {
                    return {status: "error", message: "Error con la tabla products"}
                })
            }
        })
    }

    async getAll() {
        try {
            let products = await database.select().table("products");
            return {status: "success", payload: products}
        } catch (error) {
            return {status: "error", message: "Error al buscar los productos"}
        }
    }

    async getById(id) {
        try {
            //first() para que no siga buscando
            let product = await database.select().table("products").where("id", id).first()
            if(product) {
            return {status: "success", payload: product}
            } else {
                return {status: "error", message: "Producto no encontrado"}
            }
        } catch (error) {
            return {status: "error", message: "Error buscando el producto"}
        }
    }

    async save(product) {
        try {

            let exists = await database.select().table("products").where("title", product.title).first();
            if(exists) {
                return {status: "error", message: "Producto ya existente"}
            } else {
                let result = await database.select().table("products").insert(product);
                return {status: "success", payload: result}
            }
        } catch (error) {
            return {status: "error", message: error.message}
        }
    }

    async updateObject(id, product) {
        try {
            let exists = await database.select().table("products").where("id", id).first();
            if(exists) {
                let result = await database.select().table("products").where(exists).update(product);
                return {status: "success", payload: result}
            } else {
                return {status: "error", message: "El producto no existe"}
            }
        } catch (error) {
            return {status: "error", message: "Error actualizando el producto"}
        }
    }

    async deleteById(id) {
        try {
            let exists = await database.select().table("products").where("id", id).first();
            if(exists) {
                let result = await database.select().table("products").where(exists).del();
                return {status: "success", payload: result}
            } else {
                return {status: "error", message: "El producto no existe"}
            }
        } catch (error) {
            return {status: "error", message: "Error borrando el producto"}
        }
    }
    
}

module.exports = Products;
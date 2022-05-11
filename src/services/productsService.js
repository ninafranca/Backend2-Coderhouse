import Products from "../model/Products.js";
import GenericQueries from "./genericQueries.js";
import createLogger from "../public/js/logger.js";
import {envConfig} from "../config/envConfig.js";

const logger = createLogger(envConfig.NODE_ENV);

export default class ProductsServices extends GenericQueries {

    constructor(dao) {
        super(dao, Products.model)
    }

    async getAll() {
        try {
            const readFile = await this.dao.models[Products.model].find();
            return {status: "success", payload: readFile}
        } catch(error) {
            logger.error(error.message);
            return {status: "error", message: "Error buscando productos"}
        }
    }

    async getById(id) {
        try {
            const product = await this.dao.models[Products.model].findById(id);
            if(!product) {
                logger.error(error.message);
                return {status: "error", message: "Producto no encontrado"}
            } else {
                return {status: "success", payload: product}
            }
        } catch(error) {
            logger.error(error.message);
            return {status: "error", message: "Error buscando el producto"}
        }
    }

    async save(product) {
        try {
            let exists = await this.dao.models[Products.model].findOne({title: {$eq: product.title}});
            if(exists) {
                logger.error(error.message);
                return {status: "error", message: "El producto ya existe"}
            }
            let newProduct = await this.dao.models[Products.model].create(product);
            return {status: "success", payload: newProduct}
        } catch(error) {
            logger.error(error.message);
            return {status: "error", message: "Error al guardar producto"}
        }
    }

    async updateObject(id, body) {
        try {
            let product = await this.dao.models[Products.model].findById(id);
            if(product) {
                await product.updateOne(body);
                return {status: "success", message: "Producto actualizado exitosamente"};
            }
            logger.error(error.message);
            return {status: "error", message: "No hay productos con el id especificado"}
        } catch(error) {
            return {status: "error", message: "Fallo al actualizar el producto: "}
        }
    }

    async deleteById(id) {
        try {
            let product = await this.dao.models[Products.model].findById(id)
            if(product) {
                await this.dao.models[Products.model].findByIdAndDelete(id);
                return {status: "success", message: "Producto borrado exitosamente"};
            }
            logger.error(error.message);
            return {status: "error", message: "Producto inexistente"};
        } catch(error) {
            logger.error(error.message);
            return {status: "error", message: "Error borrando producto"};
        }
    }

    async getByCategory(gender) {
        try {
            const category = await this.dao.models[Products.model].find({gender: gender});
            if(!category) {
                logger.error(error.message);
                return {status: "error", message: "No existe la categoría"};
            } else {
                return {status: "success", payload: category};
            } 
        } catch(error) {
            logger.error(error.message);
            return {status: "error", message: error.message};
        }
    }

}
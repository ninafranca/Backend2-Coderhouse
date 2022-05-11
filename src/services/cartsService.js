import Carts from "../model/Carts.js";
import GenericQueries from "./genericQueries.js";
import createLogger from "../public/js/logger.js";
import {envConfig} from "../config/envConfig.js";

const logger = createLogger(envConfig.NODE_ENV)

export default class CartsService extends GenericQueries {

    constructor(dao) {
        super(dao, Carts.model)
    }

    async getCart(id) {
        try {
            let cart = await this.dao.models[Carts.model].findById(id);
            if(!cart) {
                logger.error(error.message);
                return {status: "error", message: "El carrito no existe"};
            } else {
                return {status: "success", payload: cart};
            }
        } catch(error) {
            logger.error(error.message);
            return {status: "error", message: "Error al obtener carrito" + error};
        }
    }

    async getCartByUserId(userId) {
        try {
            let cart = await this.dao.models[Carts.model].findOne({user: userId});
            if(!cart) {
                logger.error(error.message);
                return {status: "error", message: "El usuario no cuenta con carrito existente"};
            }
            let productsId = cart.products;
            let cartId = cart._id;
            return {status: "success", payload: cart}
        } catch(error) {
            logger.error(`Error encontrando carrito de usuario`);
            return {status: "error", message: "Error encontrando carrito de usuario"};
        }
    }

    async newCart(userId) {
        try {
            const hasCart = this.dao.models[Carts.model].findOne({user: userId});
            console.log(hasCart);
            if(hasCart) {
                logger.error(error.message);
                return {status: "error", message: "Usuario ya tiene carrito"};
            }
            const cart = await this.dao.models[Carts.model].create({products: [], user: userId});
            return {status: "success", payload: cart};
        } catch(error) {
            logger.error(error.message);
            return {status: "error", message: "Error al crear carrito"};
        }
    }

    async getCartByUserIdAddProd(userId, productId) {
        try {
            const userCart = await this.dao.models[Carts.model].findOne({user: userId});
            console.log(userCart);
            if(!userCart) {
                let createCart = await this.dao.models[Carts.model].create({products: productId, user: userId});;
                let cart = await this.dao.models[Carts.model].findOne({user: userId});
                return {status: "success", payload: cart}
            } else {
                let addProdToCart = await this.dao.models[Carts.model].findByIdAndUpdate(userCart._id, {$push: {products: productId}})
                return {status: "success", payload: userCart}
            }
        } catch(error) {
            logger.error(`Error agregando producto a carrito`);
            return {status: "error", message: error.message};
        }
    }

    async saveProductById(productId, id) {
        try {
            await this.dao.models[Carts.model].findByIdAndUpdate(id, {$push: {products: productId }});
            return {status: "success", message: "El producto se ha guardado exitosamente"};
        } catch(error) {
            logger.error(error.message);
            return {status: "error", message: "Error al añadir producto"};
        }
    }

    async deleteCartById(cartId) {
        try {
            let cart = await this.dao.models[Carts.model].findById(cartId);
            if (!cart) {
                logger.error(error.message);
                return {status: "error", message: "El carrito no existe"};
            } else {
                await this.dao.models[Carts.model].findByIdAndDelete(cartId);
                return {status: "success", message: "El carrito se ha borrado exitosamente"};
            }
        } catch(error) {
            logger.error(error.message);
            return {status: "error", message: "Error al borrar carrito"};
        }
    }

    async deleteOneCartProd(cartId, productId) {
        try {
            let cart = await this.dao.models[Carts.model].findById(cartId);
            if (!cart) {
                logger.error(error.message);
                return {status: "error", message: "No existe el carrito especificado"};
            } else {
                const product = await this.dao.models[Carts.model].findById(cartId).findOne({products: productId});
                if (!product) {
                    logger.error(error.message);
                    return {status: "error", message: "El producto no existe en el carrito"};
                } else {
                    await this.dao.models[Carts.model].findById(cartId).updateOne({products: productId}, {$set: {"products.$": "delete"}});
                    await this.dao.models[Carts.model].findOneAndUpdate("delete", {$pull: { products: "delete"}})
                    return {status: "success", message: "El producto se ha borrado exitosamente del carrito"}
                }
            }
        } catch(error) {
            logger.error(error.message);
            return {status: 'error', message: error.message}
        }
    }

    async deleteCartProd(cartId, productId) {
        try {
            let cart = await this.dao.models[Carts.model].findById(cartId);
            if (!cart) {
                logger.error(error.message);
                return {status: "error", message: "No existe el carrito especificado"};
            } else {
                const product = await this.dao.models[Carts.model].findById(cartId).findOne({products: productId});
                if (!product) {
                    logger.error(error.message);
                    return {status: "error", message: "El producto no existe en el carrito"};
                } else {
                    await this.dao.models[Carts.model].findByIdAndUpdate(cartId, {$pull: {products: productId}})
                    return {status: "success", message: "El producto se ha borrado exitosamente del carrito"}
                }
            }
        } catch(error) {
            logger.error(error.message);
            return {status: 'error', message: error.message}
        }
    }

}
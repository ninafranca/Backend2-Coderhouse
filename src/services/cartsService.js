import Carts from "../model/Carts.js";
import GenericQueries from "./genericQueries.js";

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

    // getByWithPopulate = async(cartId) =>{
    //     let cart = await this.dao.models[Carts.model].findOne(cartId).populate('products.product')
    //     return cart;
    // }
}
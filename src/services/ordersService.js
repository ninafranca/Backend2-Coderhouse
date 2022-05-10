import Orders from "../model/Orders.js";
import GenericQueries from "./genericQueries.js";
import createLogger from "../public/js/logger.js";
import {envConfig} from "../config/envConfig.js";

const logger = createLogger(envConfig.NODE_ENV)

export default class OrdersService extends GenericQueries {

    constructor(dao) {
        super(dao, Orders.model)
    }

    async setOrder(products, userId) {
        try {
            const order = await this.dao.models[Orders.model].create({products: products, user: userId});
            return {status: "success", payload: order};
        } catch(error) {
            logger.error(error.message);
            return {status: "error", message: "Error al crear órden"};
        }
    }

    async getOrder(orderId) {
        try {
            const order = await this.dao.models[Orders.model].findOne({_id: orderId});
            return {status: "success", payload: order};
        } catch(error) {
            logger.error(error.message);
            return {status: "error", message: "Error al buscar órden"};
        }
    }

    async deleteOrder(orderId) {
        try {
            let order = await this.dao.models[Orders.model].findById(orderId)
            if(order) {
                await this.dao.models[Orders.model].findByIdAndDelete(orderId);
                return {status: "success", message: "Órden de compra borrada exitosamente"};
            }
            logger.error(error.message);
            return {status: "error", message: "Órden de compra inexistente"};
        } catch(error) {
            logger.error(error.message);
            return {status: "error", message: "Error borrando órden de compra"};
        }
    }
    
}
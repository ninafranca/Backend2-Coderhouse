import Orders from "../model/Orders.js";
import GenericQueries from "./genericQueries.js";

export default class OrdersService extends GenericQueries {
    constructor(dao) {
        super(dao, Orders.model)
    }
}
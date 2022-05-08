import Carts from "../model/Carts.js";
import GenericQueries from "./genericQueries.js";

export default class CartsService extends GenericQueries {
    constructor(dao) {
        super(dao, Carts.model)
    }
}
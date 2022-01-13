import {generate} from "../utils.js";

export default class ContenedorMemoria {
    constructor() {
        this.products = [];
    }
    generate(quantity = 5) {
        const people = generate(quantity);
        this.products.concat(prods);
        return prods;
    }
    getAllProds() {
        return this.products;
    }
}
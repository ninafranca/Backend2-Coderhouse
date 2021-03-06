import mongoose from 'mongoose';

let Schema = mongoose.Schema;

export default class Products {

    constructor(data) {
        this.data = data;
    }

    static get model() {
        return "Products";
    }

    static get schema() {
        return {
            title: {type: String, required: true},
            brand: {type: String, required: true},
            code: {type: String, required: true},
            price: {type: Number, required: true},
            stock: {type: Number, required: true},
            description: {type: String, required: true},
            gender: {type: String, required: true},
            thumbnail: {type: String, required: true}
        }
    }
}
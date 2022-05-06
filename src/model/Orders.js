import mongoose from 'mongoose';

let Schema = mongoose.Schema;

export default class Orders {

    constructor(data) {
        this.data = data;
    }

    static get model() {
        return "Orders";
    }

    static get schema() {
        return {
            products: {
                type: [{
                    type: String,
                    ref: "products"
                }],
                default: []
            },
            user: {type: String, required: true}
        }
    }
}
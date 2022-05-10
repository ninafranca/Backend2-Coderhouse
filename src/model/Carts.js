import mongoose from 'mongoose';

let Schema = mongoose.Schema;

export default class Carts {

    constructor(data) {
        this.data = data;
    }

    static get model() {
        return "Carts";
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
            user: { 
                type: Schema.Types.ObjectId, 
                ref: "user"
            }
        }
    }
}
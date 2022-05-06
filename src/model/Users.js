import mongoose from 'mongoose';

let Schema = mongoose.Schema;

export default class Users {

    constructor(data) {
        this.data = data;
    }

    static get model() {
        return "Users";
    }

    static get schema() {
        return {
            email: {type: String, required: true},
            name: {type: String, required: true},
            password: {type: String, required: true},
            address: {type: String, required: true},
            age: {type: Number, required: true},
            phone: {type: String, required: true},
            avatar: {type: String, required: true},
            role: {type: String, required: true}
        }
    }
}
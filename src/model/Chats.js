import mongoose from 'mongoose';

let Schema = mongoose.Schema;

export default class Chats {

    constructor(data) {
        this.data = data;
    }

    static get model() {
        return "Chats";
    }

    static get schema() {
        return {
            author: {
                email: {type: String},
                name: {type: String, required: false},
                age: {type: Number, required: false},
                alias: {type: String, required: false},
                avatar: {type: String, required: false}
            },
            text: {type: String}
        }
    }
}
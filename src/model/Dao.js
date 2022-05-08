import Users from "./Users.js";
import Chats from "./Chats.js";
import Products from "./Products.js";
import Carts from "./Carts.js";
import Orders from "./Orders.js";
import {envConfig} from "../config/envConfig.js";
import createLogger from "../public/js/logger.js";

const logger = createLogger(envConfig.NODE_ENV);

export default class Dao {

    constructor(config) {
        this.mongoose = mongoose.connect(config.url, {useNewUrlParser: true}).catch(error => {
            logger.error(error.message);
            process.exit();
        })

        const timestamp = {timestamps: {createdAt: "created_at", updatedAt: "updated_at"}};
        const usersSchema = mongoose.Schema(Users.schema,timestamp);
        const productsSchema = mongoose.Schema(Products.schema,timestamp);
        const cartsSchema = mongoose.Schema(Carts.schema,timestamp);
        const chatsSchema = mongoose.Schema(Chats.schema,timestamp);
        const ordersSchema = mongoose.Schema(Orders.schema,timestamp);

        this.models = {
            [Users.model]: mongoose.model(Users.model, usersSchema),
            [Products.model]: mongoose.model(Products.model, productsSchema),
            [Carts.model]: mongoose.model(Carts.model, cartsSchema),
            [Chats.model]: mongoose.model(Chats.model, chatsSchema),
            [Orders.model]: mongoose.model(Orders.model, ordersSchema)
        }

    }

    findOne = async(options,entity)=> {
        if(!this.models[entity]) throw new Error(`Entity ${entity} not in dao schemas`)
        let result  = await this.models[entity].findOne(options);
        return result?result.toObject():null;
    }

    getAll = async(options,entity)=> {
        if(!this.models[entity]) throw new Error(`Entity ${entity} not in dao schemas`)
        let results = await this.models[entity].find(options);
        return results.map(result=>result.toObject())
    }

    insert = async(document,entity)=> {
        if(!this.models[entity]) throw new Error(`Entity ${entity} not in dao schemas`)
        try{
            let instance = new this.models[entity](document);
            let result = await instance.save();
            return result?result.toObject():null;
        }catch(error){
            console.log(error);
            return null;
        }
    }

    update = async(document,entity) => {
        if(!this.models[entity]) throw new Error(`Entidad ${entity} no existente en dao schemas`)
        let id = document._id;
        delete document._id;
        let result = await this.models[entity].findByIdAndUpdate(id,{$set:document},{new:true})
        return result.toObject();
    }

    delete = async(id,entity) => {
        if(!this.models[entity]) throw new Error(`Entidad ${entity} no existente en dao schemas`)
        let result = await this.models[entity].findByIdAndDelete(id);
        return result?result.toObject():null;
    }

    exists = async(entity,options) => {
        if(!this.models[entity]) throw new Error(`Entidad ${entity} no existente en dao schemas`)
        return this.models[entity].exists(options)
    }

}
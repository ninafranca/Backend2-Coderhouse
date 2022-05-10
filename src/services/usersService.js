import Users from "../model/Users.js";
import GenericQueries from "./genericQueries.js";
import createLogger from "../public/js/logger.js";
import {envConfig} from "../config/envConfig.js";

const logger = createLogger(envConfig.NODE_ENV);

export default class UsersService extends GenericQueries {

    constructor(dao) {
        super(dao, Users.model)
    }

    async getUsers() {
        try {
            const readFile = await this.dao.models[Users.model].find();
            if(!readFile) {
                logger.error(error.message);
                return {status: "error", message: "No hay usuarios"};
            } else {
                return {status: "success", payload: readFile};
            } 
        } catch(error) {
            logger.error(error.message);
            return {status: "error", message: "Error leyendo los usuarios"};
        }
    }

    async getById(id) {
        try {
            const userFound = await this.dao.models[Users.model].findById({_id: id});
            if(!userFound) {
                logger.error(error.message);
                return {status: "error", message: "No existe el usuario"};
            } else {
                return {status: "success", payload: userFound};
            } 
        } catch(error) {
            logger.error(error.message);
            return {status: "error", message: error.message};
        }
    }

    async getByEmail(email) {
        try {
            const userFound = await this.dao.models[Users.model].findOne({email: email});
            console.log(userFound);
            if(!userFound) {
                logger.error(error.message);
                return {status: "error", message: "No existe el usuario"};
            } else {
                return {status: "success", payload: userFound};
            } 
        } catch(error) {
            logger.error(error.message);
            return {status: "error", message: error.message};
        }
    }

}
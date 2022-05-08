import Users from "../model/Users.js";
import GenericQueries from "./genericQueries.js";

export default class UsersService extends GenericQueries {
    constructor(dao) {
        super(dao, Users.model)
    }
}
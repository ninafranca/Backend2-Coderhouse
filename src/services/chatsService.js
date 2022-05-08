import Chats from "../model/Chats.js";
import GenericQueries from "./genericQueries.js";

export default class ChatsService extends GenericQueries {
    constructor(dao) {
        super(dao, Chats.model)
    }
}
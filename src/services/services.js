import Dao from "../model/Dao.js";
import UsersService from "./usersService.js";
import ProductsService from "./productsService.js"
import ChatsService from "./chatsService.js";
import OrdersService from "./ordersService.js";
import CartsService from "./cartsService.js";
import config from "../config/config.js";

const dao = new Dao(config.mongo)

export const usersService = new UsersService(dao);
export const productsService = new ProductsService(dao);
export const chatsService = new ChatsService(dao);
export const cartsService = new CartsService(dao);
export const ordersService = new OrdersService(dao);
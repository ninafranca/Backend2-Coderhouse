import express from "express";
import ordersController from "../controllers/orders.controller.js";

const router = express.Router();

//GET
// Devuelve una órden de compra
router.get("/:order_id", ordersController.getOrder)

//POST
// Crea órden por id de carrito y usuario
router.post("/cart/:cart_id/user/:user_id", ordersController.setOrder)

//DELETE
// Borra una órden de compra
router.delete("/:order_id", ordersController.deleteOrder)

export default router;
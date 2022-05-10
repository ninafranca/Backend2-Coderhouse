import express from "express";
import ordersController from "../controllers/orders.controller.js";

const router = express.Router();

//GET
// Devuelve el carrito de un usuario
// router.get("/:user_id", (req, res) => {
//     let userId = req.params.user_id;
//     carts.getCartByUserId(userId).then(result => {
//         res.send(result);
//     })
// })

//POST
//Crea órden por id de carrito y usuario
router.post("/cart/:cart_id/user/:user_id", ordersController.setOrder)

export default router;
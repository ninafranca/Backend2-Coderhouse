import express from "express";
import cartsController from "../controllers/carts.controller.js";

const router = express.Router();

// GET //
// Devuelve todos los productos de un carrito
router.get("/:cart_id/productos", cartsController.getCartById)

// Devuelve el carrito de un usuario
router.get("/:user_id", cartsController.getCartByUserId)

// POST //
//Crea un carrito y devuelve su id
router.post("/:user_id", cartsController.newCart)

//Agrega producto a carrito de usuario
router.post("/usuario/:user_id/producto/:prod_id", cartsController.getCartByUserIdAddProd)

//incorpora productos al carrito de usuario por su id de producto
router.post("/:id_cart/productos/:id_prod", cartsController.saveProductById)

// DELETE //
//Elimina un carrito
router.delete("/:id", cartsController.deleteCartById)

//Elimina una sola equivalencia de producto del carrito por su id de producto y de carrito
router.delete("/:id_cart/producto/:id_prod", cartsController.deleteOneCartProd)

//Elimina todos los IDs de mismo producto del carrito por su id de producto y de carrito
router.delete("/:id_cart/productos/:id_prod", cartsController.deleteCartProd)

export default router;
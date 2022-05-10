import express from "express";
import productsController from "../controllers/products.controller.js";

const router = express.Router();

//GET
// Devuelve todos los productos
router.get("/", productsController.getAll)

// Devuelve un producto
router.get("/:id", productsController.getById)

//POST
// Guarda un producto
router.post("/", productsController.save)

//PUT
// Actualiza un producto
router.put("/:id", productsController.updateObject)

//DELETE
// Borra un producto
router.delete("/:id", productsController.deleteById)

export default router;
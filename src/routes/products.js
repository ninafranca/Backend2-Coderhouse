import express from "express";
import productsController from "../controllers/products.controller.js";
import {products} from "../daos/index.js";

const router = express.Router();

//GETS
router.get("/", productsController.getAll)

router.get("/:id", productsController.getById)

//POST
//router.post("/", productsController.save)
router.post("/", (req, res) => {
    let prod = req.body;
    products.save(prod).then(result => {
        res.send(result);
        if(result.status === "success"){
            products.getAll().then(result => {
                req.io.emit("deliverProducts", result);
            })
        }
    })
})

//PUT
router.put("/:id", productsController.updateObject)

//DELETE
router.delete("/:id", productsController.deleteById)

export default router;
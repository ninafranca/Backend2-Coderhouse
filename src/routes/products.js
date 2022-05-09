import express from "express";
import productsController from "../controllers/products.controller.js";
import {products} from "../daos/index.js";

const router = express.Router();

//GETS
router.get("/", productsController.getAll)
// router.get("/", (req, res) => {
//     products.getAll().then(result => {
//         res.send(result);
//     })
// })

router.get("/:id", productsController.getById)
// router.get("/:id", (req, res) => {
//     let id = req.params.id;
//     products.getById(id).then(result => {
//         res.send(result);
//     })
// })

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
// router.put("/:id", (req, res) => {
//     let body = req.body;
//     let id = req.params.id;
//     products.updateObject(id, body).then(result => {
//         res.send(result);
//     })
// })

//DELETE
router.delete("/:id", productsController.deleteById)
// router.delete("/:id", (req, res) => {
//     let id = req.params.id;
//     products.deleteById(id).then(result => {
//         res.send(result);
//     })
// })

export default router;
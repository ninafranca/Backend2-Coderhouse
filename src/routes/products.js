import express from "express";
import productsController from "../controllers/products.controller.js";
//import {products} from "../daos/index.js";
import {productsService} from "../services/services.js";

const router = express.Router();

//GETS
router.get("/", productsController.getAll)

router.get("/:id", productsController.getById)

//POST
// router.post("/", (req, res) => {
//     let prod = req.body;
//     console.log(prod);
//     productsService.save(prod).then(result => {
//         console.log(result);
//         res.send(result);
//         if(result.status === "success"){
//             console.log(0);
//             productsService.getAll().then(result => {
//                 console.log(1);
//                 console.log("result: ", result);
//                 console.log(2);
//                 req.io.emit("deliverProducts", result);
//             })
//         }
//     })
// })
router.post("/", productsController.save)
// router.post("/", (req, res) => {
//     let prod = req.body;
//     console.log(prod);
//     productsService.save(prod).then(result => {
//         res.send(result);
//         if(result.status === "success"){
//             productsService.getAll().then(result => {
//                 req.io.emit("deliverProducts", result);
//             })
//         }
//     })
// })

//PUT
router.put("/:id", productsController.updateObject)

//DELETE
router.delete("/:id", productsController.deleteById)

export default router;
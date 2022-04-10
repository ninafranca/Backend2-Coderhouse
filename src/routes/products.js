import express from "express";
import {products, persistance} from "../daos/index.js";
import logger from "../public/js/logger.js";

const admin = true;
const router = express.Router();
const fileSystem = "fileSystem";

//GETS
router.get("/", (req, res) => {
    products.getAll().then(result => {
        res.send(result);
    })
})

router.get("/:id", (req, res) => {
    if(persistance === fileSystem) {
        let id= parseInt(req.params.id);
        products.getById(id).then(result => {
            res.send(result);
        })
    } else {
        let id = req.params.id;
        products.getById(id).then(result => {
            res.send(result);
        })
    }
})

//POST
router.post("/", (req, res) => {
    if(admin) {
        let prod = req.body;
        products.save(prod).then(result => {
        res.send(result);
        if(result.status === "success"){
            products.getAll().then(result => {
                req.io.emit("deliverProducts", result);
            })
        }
    })
    } else {
        logger.warn(`Método ${req.method} no disponible en ruta ${req.path}`);
        res.status(403).send({ error: -1, description: `Ruta ${req.path} metodo ${req.method} no autorizado`})
    }
})

//PUT
router.put("/:id", (req, res) => {
    if(admin) {
        let body = req.body;
        if(persistance === fileSystem) {
            let id = parseInt(req.params.id);
            products.updateObject(id, body).then(result => {
                res.send(result);
            })
        } else {
            let id = req.params.id;
            products.updateObject(id, body).then(result => {
                res.send(result);
            })
        }
    } else {
        logger.warn(`Método ${req.method} no disponible en ruta ${req.path}`);
        res.status(403).send({ error: -1, description: `Ruta ${req.path} metodo ${req.method} no autorizado`})
    }
})

//DELETE
router.delete("/:id", (req, res) => {
    if(admin) {
        if(persistance === fileSystem) {
            let id= parseInt(req.params.id);
            products.deleteById(id).then(result => {
                res.send(result);
            })
        } else {
            let id = req.params.id;
            products.deleteById(id).then(result => {
                res.send(result);
            })
        }
    } else {
        logger.warn(`Método ${req.method} no disponible en ruta ${req.path}`)
        res.status(403).send({ error: -1, description: `Ruta ${req.path} metodo ${req.method} no autorizado`})
    }
})

export default router;
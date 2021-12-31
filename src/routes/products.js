import express from "express";
import Contenedor from "../contenedor/Contenedor.js";
//import Products from "../services/ProductsDB.js";
import {products} from "../daos/index.js";

//const contenedor  = new Contenedor();
const admin = true;
const router = express.Router();
//const productsService = new Products();

//GETS
router.get('/', (req, res) => {
    products.getAll().then(result => {
        res.send(result);
    })
})

router.get('/:id', (req, res)=>{
    let id= parseInt(req.params.id);
    products.getById(id).then(result => {
        res.send(result);
    })
})

//POST
router.post('/', (req, res) => {
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
        res.status(403).send({ error: -1, description: "Ruta '/api/productos' metodo POST no autorizado"})
    }
})

//PUT
router.put('/:id', (req, res) => {
    if(admin) {
        let body = req.body;
        let id = parseInt(req.params.id);
        products.updateObject(id, body).then(result => {
            res.send(result);
        })
    } else {
        res.status(403).send({ error: -1, description: "Ruta '/api/productos/:id' metodo PUT no autorizado"})
    }
})

//DELETE
router.delete('/:id', (req, res) => {
    if(admin) {
        let id= parseInt(req.params.id);
        products.deleteById(id).then(result => {
            res.send(result);
        })
    } else {
        res.status(403).send({ error: -1, description: "Ruta '/api/productos/:id' metodo DELETE no autorizado"})
    }
})

export default router;
const express = require("express");
const Contenedor = require("../contenedor/Contenedor");
const contenedor  = new Contenedor();
const admin = true;
//import Contenedor from "../contenedor/Contenedor.js"
//import express from "express";
const router = express.Router();
const Products = require("../services/ProductsDB");
const productsService = new Products();
const {products} = require("../daos/index")


//GETS
router.get('/', (req, res) => {
    products.getAll().then(result => {
        res.send(result);
    })
})

router.get('/:id', (req, res)=>{
    let id= parseInt(req.params.id);
    productsService.getById(id).then(result => {
        res.send(result);
    })
})

//POST
router.post('/', (req, res) => {
    if(admin) {
        let prod = req.body;
        productsService.save(prod).then(result => {
        res.send(result);
        if(result.status === "success"){
            productsService.getAll().then(result => {
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
        productsService.updateObject(id, body).then(result => {
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
        productsService.deleteById(id).then(result => {
            res.send(result);
        })
    } else {
        res.status(403).send({ error: -1, description: "Ruta '/api/productos/:id' metodo DELETE no autorizado"})
    }
})

module.exports = router;
//export default router;
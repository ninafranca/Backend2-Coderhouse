const express = require("express");
const Carrito = require("../classes/Carrito");
const carrito  = new Carrito();
//import Contenedor from "../classes/Contenedor.js"
//import express from "express";
const router = express.Router();

//GET: devuelve todos los productos del carrito
/*router.get('/', (req, res) => {
    contenedor.getAllProds().then(result => {
        res.send(result);
    })
})*/

router.get('/:id/productos', (req, res)=>{
    let id= parseInt(req.params.uid);
    contenedor.getById(id).then(result => {
        res.send(result);
    })
})

//POST: crea un carrito y devuelve su id
router.post('/', (req, res) => {
    let prod = req.body;
    console.log(prod);
    contenedor.save(prod).then(result => {
        res.send(result);
        if(result.status === "success"){
            contenedor.getAll().then(result => {
                console.log(result);
                req.io.emit("deliverProducts", result);
            })
        }
    })
})

//POST: crea un carrito y devuelve su id
router.post('/:id/productos', (req, res) => {
    let prod = req.body;
    console.log(prod);
    contenedor.save(prod).then(result => {
        res.send(result);
        if(result.status === "success"){
            contenedor.getAll().then(result => {
                console.log(result);
                req.io.emit("deliverProducts", result);
            })
        }
    })
})

//PUT
router.put('/:uid', (req, res) => {
    let body = req.body;
    let id = parseInt(req.params.uid);
    contenedor.updateObject(id, body).then(result => {
        res.send(result);
    })
})

//DELETE: vacia un carrito y lo elimina
router.delete('/:uid', (req, res) => {
    let id= parseInt(req.params.uid);
    console.log(id)
    contenedor.deleteById(id).then(result => {
        res.send(result);
    })
})

//DELETE ID: eliminar un producto por su id de producto y de carrito
router.delete('/:uid/productos/:id_prod', (req, res) => {
    let id= parseInt(req.params.uid);
    console.log(id)
    contenedor.deleteById(id).then(result => {
        res.send(result);
    })
})

module.exports = router;
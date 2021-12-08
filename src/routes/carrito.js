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

router.get('/:uid/productos', (req, res)=>{
    let id = req.params.uid;
    carrito.getCart(id).then(result => {
        res.send(result);
    })
})

//POST: crea un carrito y devuelve su id
router.post('/', (req, res) => {
    carrito.newCart().then(result => {
        res.send(result);
        if(result.status === "success"){
            carrito.getAll().then(result => {
                console.log(result);
            })
        }
    })
})

//POST: incorpora productos al carrito por su id de producto
router.post('/:id/productos/:id_cart', (req, res) => {
    let prodId = Number(req.params.id);
    let ticket = req.params.id_cart;
    carrito.saveProdById(prodId, ticket).then(result => {
        res.send(result);
    })
})

//DELETE: vacia un carrito y lo elimina
router.delete('/:id', (req, res) => {
    let ticket = req.params.id;
    console.log(ticket)
    carrito.deleteCartById(ticket).then(result => {
        res.send(result);
    })
})

//DELETE ID: eliminar un producto por su id de producto y de carrito
router.delete('/:uid/productos/:id_prod', (req, res) => {
    let id= parseInt(req.params.uid);
    console.log(id)
    contenedor.deleteProdByCartId(id).then(result => {
        res.send(result);
    })
})

module.exports = router;
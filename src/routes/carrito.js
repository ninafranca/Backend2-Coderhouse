const express = require("express");
const Carrito = require("../classes/Carrito");
const carrito  = new Carrito();
//import Contenedor from "../classes/Contenedor.js"
//import express from "express";
const router = express.Router();

//GET: devuelve todos los productos del carrito
router.get('/:id/productos', (req, res)=>{
    let id = req.params.id;
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
    let cartId = req.params.id_cart;
    carrito.saveProdById(prodId, cartId).then(result => {
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
router.delete('/:id/productos/:id_prod', (req, res) => {
    let prodId = Number(req.params.id_prod);
    let ticket = req.params.id;
    carrito.deleteCartProd(ticket, prodId).then(result => {
        res.send(result);
    })
})

module.exports = router;
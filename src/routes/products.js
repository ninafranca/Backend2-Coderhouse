const express = require("express");
const Contenedor = require("../classes/Contenedor");
//import Contenedor from "../classes/Contenedor.js"
//import express from "express";
const {io} = require("../app.js");
const router = express.Router();
const contenedor  = new Contenedor();

//GETS
router.get('/', (req, res) => {
    contenedor.getAll().then(result => {
        res.send(result);
    })
})

router.get('/:uid', (req, res)=>{
    let id= parseInt(req.params.uid);
    contenedor.getById(id).then(result => {
        res.send(result);
    })
})

//POST
router.post('/', (req, res) => {
    let prod = req.body;
    console.log(prod);
    contenedor.save(prod).then(result => {
        res.send(result);
        if(result.status === "success"){
            contenedor.getAll().then(result => {
                console.log(result);
                io.emit("deliverProducts", result);
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

//DELETE
router.delete('/:uid', (req, res) => {
    let id= parseInt(req.params.uid);
    console.log(id)
    contenedor.deleteById(id).then(result => {
        res.send(result);
    })
})

module.exports = router;
//export default router;
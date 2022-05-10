import {productsService} from "../services/services.js";

const getAll = async (req,res) =>{
    productsService.getAll().then(result => {
        res.send(result);
    })
}

const getById = async (req,res) =>{
    let id = req.params.id;
    productsService.getById(id).then(result => {
        res.send(result);
    })
}
// CHEQUEAR EMIT//
const save = async (req, res) => {
    let prod = req.body;
    productsService.save(prod).then(result => {
        res.send(result);
        productsService.getAll().then(result => {
            req.io.emit("deliverProducts", result);
        })
    })
}

const updateObject = async (req,res) =>{
    let body = req.body;
    let id = req.params.id;
    productsService.updateObject(id, body).then(result => {
        res.send(result);
    })
}

const deleteById = async (req, res) => {
    let id = req.params.id;
    productsService.deleteById(id).then(result => {
        res.send(result);
    })
}

export default {
    getAll,
    getById,
    save,
    updateObject,
    deleteById
}
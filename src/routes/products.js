import express from "express";
const router = express.Router();
import Contenedor from "../classes/Contenedor.js"
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

export default router;
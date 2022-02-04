import express from "express";
import {fork} from "child_process";

const router = express.Router();

router.get("/", (req, res) => {
    const child = fork("../Desafio Rutas/src/public/js/randomsCalc.js");
    let quantity = Number(req.query.cant);
    if (!(quantity >= 0)) quantity = 100000000;
    console.log(quantity);
    child.send(quantity);
    child.on("message", (numbers) => {
        console.log(numbers);
        res.send(`Número/s random ${numbers}`)
    })
})

export default router;
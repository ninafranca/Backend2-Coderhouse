import express from "express";
import {fork} from "child_process";

const router = express.Router();

router.get("/", (req, res) => {
    const random = fork("../Desafio Rutas/src/public/js/randomsCalc.js");
    random.on("message", (data) => {
        res.send(`Número random ${data}`)
    })
})

export default router;
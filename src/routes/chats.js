import express from "express";
import {chats} from "../daos/index.js";

const router = express.Router();
const fileSystem = "fileSystem";

//GET: devuelve todos los mensajes del chat
router.get('/', (req, res)=>{
    chats.getAllMessages().then(result => {
        res.send(result);
    })
})

//POST: guarda un mensaje al chat
router.post('/', (req, res) => {
    let message = req.body;
    chats.saveMessage(message).then(result => {
        console.log(result);
    })
})

export default router
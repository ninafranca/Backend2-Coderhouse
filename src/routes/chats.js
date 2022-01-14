import express from "express";
import {chats} from "../daos/index.js";
import ChatsMongo from "../daos/chats/chatsMongo.js";

const router = express.Router();

//GET: devuelve todos los mensajes del chat
router.get('/', (req, res)=>{
    chats.getAllMessages().then(result => {
        res.send(result);
    })
})

//POST: guarda un mensaje al chat
router.post('/', (req, res) => {
    let chat = new ChatsMongo({
        id: req.body.user,
        first_name: req.body.first_name,
        last_name: req.body.last_name,
        alias: req.body.alias,
        avatar: req.body.avatar,
        age: req.body.age,
        message: req.body.input
    })
    chat.saveMessage(message).then(result => {
        console.log(result);
    })
})

export default router
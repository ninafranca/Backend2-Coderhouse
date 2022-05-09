import express from "express";
import chatsControllers from "../controllers/chats.controllers.js";
import {chats} from "../daos/index.js";

const router = express.Router();

//GET: devuelve todos los mensajes del chat
router.get("/", chatsControllers.getAllMessages)
// router.get("/", (req, res)=>{
//     chats.getAllMessages().then(result => {
//         res.send(result);
//     })
// })

//POST: guarda un mensaje en el chat
router.post("/", chatsControllers.saveMessage)
// router.post("/", async (req, res) => {
//     let chat = req.body;
//     let data = await chats.saveMessage(chat);
//     res.send({status: "success", payload: data})
// })

export default router;
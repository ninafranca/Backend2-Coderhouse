import express from "express";
import chatsControllers from "../controllers/chats.controllers.js";

const router = express.Router();

//GET
// Devuelve todos los mensajes del chat
router.get("/", chatsControllers.getAllMessages)

//POST 
// Guarda un mensaje en el chat
router.post("/", chatsControllers.saveMessage)

export default router;
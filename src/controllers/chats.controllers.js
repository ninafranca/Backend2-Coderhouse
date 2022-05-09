import {chatsService} from "../services/services.js";

const getAllMessages = async (req, res) => {
    chatsService.getAllMessages().then(result => {
        res.send(result);
    })
}

const saveMessage = async (req, res) => {
    let chat = req.body;
    let data = await chatsService.saveMessage(chat);
    res.send({status: "success", payload: data})

}

export default {
    getAllMessages,
    saveMessage
}
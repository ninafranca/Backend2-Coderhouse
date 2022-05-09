import {usersService} from "../services/services.js";

const getUsers = async(req,res) =>{
    usersService.getUsers().then(result => {
        res.send(result);
    })
}

const getById = async(req,res) =>{
    const userId = req.params.user_id
    usersService.getById(userId).then(result => {
        res.send(result);
    })
}

export default {
    getUsers,
    getById
}
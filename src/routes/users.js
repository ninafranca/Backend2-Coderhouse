import express from "express";
import {users} from "../daos/index.js";

const router = express.Router();

//GET
router.get("/", (req, res) => {
    users.getUsers().then(result => {
        res.send(result);
    })
})

//POST
// router.post("/", async (req, res) => {
//     let user = req.body;
//     console.log(user);
//     let data = await users.saveUser(user)
//     res.send({user: data})
// })

export default router;
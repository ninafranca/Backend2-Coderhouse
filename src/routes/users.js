import express from "express";
import usersController from "../controllers/users.controller.js";
//import {users} from "../daos/index.js";

const router = express.Router();

//GET
router.get("/", usersController.getUsers)
// router.get("/", (req, res) => {
//     users.getUsers().then(result => {
//         res.send(result);
//     })
// })

router.get("/:user_id", usersController.getById)
// router.get("/:user_id", (req, res) => {
//     const userId = req.params.user_id
//     users.getById(userId).then(result => {
//         res.send(result);
//     })
// })

export default router;
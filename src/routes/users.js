import express from "express";
import usersController from "../controllers/users.controller.js";

const router = express.Router();

//GET
router.get("/", usersController.getUsers)

router.get("/:user_id", usersController.getById)

export default router;
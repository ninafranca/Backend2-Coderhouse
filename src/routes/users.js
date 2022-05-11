import express from "express";
import usersController from "../controllers/users.controller.js";

const router = express.Router();

// GET //
// Devuelve todos los usuarios
router.get("/", usersController.getUsers)

// Devuelve un usuario
router.get("/:user_id", usersController.getById)

export default router;
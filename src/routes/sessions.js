import express from "express";
import {carts} from "../daos/index.js";
import __dirname from "../utils.js";
import { passportCall } from "../middlewares/middlewares.js";
import jwt from "jsonwebtoken";
import {envConfig} from "../config/envConfig.js";
import upload from "../services/upload.js";

const router = express.Router();

// GETS //
router.get("/register", (req, res) => {
    res.sendFile("register.html", {root: __dirname + "/public/pages"});
})

router.get("/logout", (req, res) => {
    res.sendFile("logout.html", {root: __dirname + "/public/pages"});
})

router.get("/registration-error", (req, res) => {
    res.sendFile("registration-error.html", {root: __dirname + "/public/pages"});
})

// POSTS //
router.post("/login", passportCall("login"), (req, res) => {
    let user = req.user;
    let token = jwt.sign(user, envConfig.JWT_SECRET);
    res.cookie("JWT_COOKIE", token, {
        httpOnly: true,
        maxAge: 1000*60*60
    });
    res.send({status: "scuccess", message: "Login exitoso"});
})

router.post("/register", upload.single("avatar"), passportCall("register"), (req, res) => {
    if(res.status === "error") {
        res.send({status: "error", message: "Usuario ya existente"})
    } else {
        res.send({status: "success", message: "Usuario registrado con éxito"})
    }
})

router.post("/logout", (req, res) => {
    res.clearCookie("JWT_COOKIE");
    res.sendFile("logout.html", {root: __dirname + "/public/pages"});
})

export default router;
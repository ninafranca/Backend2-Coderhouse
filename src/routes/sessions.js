import express from "express";
import __dirname from "../utils.js";
import {passportCall} from "../middlewares/middlewares.js";
import jwt from "jsonwebtoken";
import {envConfig} from "../config/envConfig.js";
import upload from "../services/upload.js";
import {productsService} from "../services/services.js";

const router = express.Router();

// GETS //
// Render de archivo html
router.get("/register", (req, res) => {
    res.sendFile("register.html", {root: __dirname + "/public/pages"});
})

// Render de archivo html
router.get("/logout", (req, res) => {
    res.sendFile("logout.html", {root: __dirname + "/public/pages"});
})

// Render de archivo html
router.get("/registration-error", (req, res) => {
    res.sendFile("registration-error.html", {root: __dirname + "/public/pages"});
})

// POSTS //
// Loguea un usuario
router.post("/login", passportCall("login"), (req, res) => {
    let user = req.user;
    let token = jwt.sign(user, envConfig.JWT_SECRET);
    res.cookie("JWT_COOKIE", token, {
        httpOnly: true,
        maxAge: 1000*60*60
    });
    res.send({status: "scuccess", message: "Login exitoso"});
})

// Registra un usuario
router.post("/register", upload.single("avatar"), passportCall("register"), (req, res) => {
    if(res.status === "error") {
        res.send({status: "error", message: "Usuario ya existente"})
    } else {
        res.send({status: "success", message: "Usuario registrado con éxito"})
    }
})

// Borra cookie para hacer un logout
router.post("/logout", (req, res) => {
    res.clearCookie("JWT_COOKIE");
    res.sendFile("logout.html", {root: __dirname + "/public/pages"});
})

// router.get("/chat", passportCall("jwt"), (req, res) => {
//     console.log(1);
//     let user = req.user.payload.toObject();
//     let role = req.user.payload.toObject().role.toUpperCase();
//     console.log(user, role);
//     if(role === "ADMIN") {
//         res.render("ChatAdmin", {user});
//     } else {
//         res.render("Chat", {user});
//     }
// })

// router.get("/productos", passportCall("jwt"), (req, res) => {
//     let user = req.user.payload.toObject();
//     productsService.getAll().then(result => {
//         const products = result;
//         const objects = {products: products, user: user};
//         res.render("Home", objects)
//     })
// })

// router.get("/add-products-admin", passportCall("jwt"), (req, res) => {
//     let user = req.user.payload.toObject();
//     console.log("userrrr", user);
//     res.render("AddProductsAdmin", {user});
// })

// router.get("/admin-info", passportCall("jwt"), (req, res) => {
//     let user = req.user.payload.toObject();
//     res.render("AdminInfo", {user});
// })

export default router;
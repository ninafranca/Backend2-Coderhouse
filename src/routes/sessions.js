import express from "express";
import {carts} from "../daos/index.js";
import __dirname from "../utils.js";

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

// POST //
router.post("/logout", (req, res) => {
    res.clearCookie("JWT_COOKIE");
    res.sendFile("logout.html", {root: __dirname + "/public/pages"});
})

export default router;
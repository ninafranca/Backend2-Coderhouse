import express from "express";

const router = express.Router();

router.get("/", (req, res) => {
    res.sendFile("login.html", {root: __dirname + "/public/pages"});
})
router.get("/register", (req, res) => {
    res.sendFile("register.html", {root: __dirname + "/public/pages"});
})
router.get("/logout", (req, res) => {
    res.sendFile("logout.html", {root: __dirname + "/public/pages"});
})
router.get("/registration-error", (req, res) => {
    res.sendFile("registration-error.html", {root: __dirname + "/public/pages"});
})
router.get("/logged", passportCall("jwt"), (req, res) => {
    let user = req.user.payload.toObject();
    let role = req.user.payload.toObject().role.toUpperCase();
    console.log(role);
    if(role === "ADMIN") {
        console.log("logged: ", user);
        res.render("LoggedAdmin", {user});
    } else {
        console.log("logged: ", user);
        res.render("Logged", {user});
    }
})

router.post("/register", upload.single("avatar"), passportCall("register"), (req, res) => {
    if(res.status === "error") {
        res.send({status: "error", message: "Usuario ya existente"})
    } else {
        res.send({status: "success", message: "Usuario registrado con éxito"})
    }
})
router.post("/login", passportCall("login"), (req, res) => {
    let user = req.user;
    let token = jwt.sign(user, envConfig.JWT_SECRET);
    res.cookie("JWT_COOKIE", token, {
        httpOnly: true,
        maxAge: 1000*60*60
    });
    res.send({status: "scuccess", message: "Login exitoso"});
})
router.post("/logout", (req, res) => {
    res.clearCookie("JWT_COOKIE");
    res.sendFile("logout.html", {root: __dirname + "/public/pages"});
})
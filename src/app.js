import __dirname from "./utils.js";
import express from "express";
import Contenedor from "./contenedor/Contenedor.js";
//import Carrito from "./contenedor/Carrito.js";
import {chats, users, products} from "./daos/index.js";
import productsRouter from "./routes/products.js";
import carritoRouter from "./routes/carrito.js";
import chatsRouter from "./routes/chats.js";
import usersRouter from "./routes/users.js";
//import loginRouter from "./routes/login.js";
import {generate} from "./utils.js";
import {Server} from "socket.io";
import {engine} from "express-handlebars";
import cors from "cors";
import session from "express-session";
import MongoStore from "connect-mongo";
import createLogger from "./public/js/logger.js";
import {cwd, pid, version, title, platform, memoryUsage} from "process";
import passport from "passport";
import initializePassport from "./public/js/passport.js";
import upload from "./public/js/upload.js";
import {passportCall, checkAuth} from "./public/js/middlewares.js";
import jwt from "jsonwebtoken";
import cookieParser from "cookie-parser";
import {envConfig} from "./config/envConfig.js";

const contenedor = new Contenedor();
//const carrito = new Carrito();
const app = express();
const PORT = parseInt(process.env.PORT) || 8080;
const server = app.listen(PORT,() => {
    console.log("Listening on port: ", PORT)
});
const io = new Server(server);
const logger = createLogger(envConfig.NODE_ENV);

//APP.USE
app.use(express.json());
app.use(cors());
app.use(express.urlencoded({extended:true}));
app.use((req, res, next) => {
    req.io = io;
    next();
})
app.use("/api/productos", productsRouter);
app.use("/api/carrito", carritoRouter);
app.use("/api/chats", chatsRouter);
app.use("/users", usersRouter);
app.use(express.static(__dirname + "/public"));
app.use(session({
    store: MongoStore.create({mongoUrl: envConfig.MONGO_SESSIONS}),
    secret: envConfig.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {maxAge: 1000}
}))
initializePassport();
app.use(passport.initialize());
app.use(passport.session());
app.use(cookieParser())

//APP.ENGINE
//Para Handlebars
app.engine("handlebars", engine());

//APP.SET
app.set("views", __dirname + "/views");
//Para Handlebars
app.set("view engine", "handlebars");

//APP.GET
app.get("/", (req, res) => {
    res.sendFile("index.html", {root: __dirname + "/public/pages"});
})
app.get("/login", (req, res) => {
    res.sendFile("login.html", {root: __dirname + "/public/pages"});
})
app.get("/register", (req, res) => {
    res.sendFile("register.html", {root: __dirname + "/public/pages"});
})
app.get("/logout", (req, res) => {
    res.sendFile("logout.html", {root: __dirname + "/public/pages"});
})
app.get("/registration-error", (req, res) => {
    res.sendFile("registration-error.html", {root: __dirname + "/public/pages"});
})
app.get("/chat", passportCall("jwt"), (req, res) => {
    let user = req.user.payload.toObject();
    res.render("Chat", {user});
})
// app.get("/api/productos-test", (req, res) => {
//     let quantity = req.query.quantity ? parseInt(req.query.quantity) : 10;
//     let products = generate(quantity);
//     res.render("ProductsTest", {prods: products});
// })
app.get("/logged", passportCall("jwt"), checkAuth(["ADMIN","USER"]), (req, res) => {
    let user = req.user.payload.toObject();
    console.log("logged: ", user);
    res.render("Logged", {user});
})
app.get("/user-info", passportCall("jwt"), (req, res) => {
    let user = req.user.payload.toObject();
    res.render("User", {user});
})
app.get("/info", (req, res) => {
    let info = {
        arguments: process.argv,
        cwd: cwd(),
        pid: pid,
        version: version,
        title: title,
        platform: platform,
        memory: memoryUsage()
    }
    logger.info(info);
    res.send(info);
});
//HANDLEBARS
app.get("/productos", passportCall("jwt"), (req, res) => {
    //let user = req.user.payload.toObject();
    products.getAll().then(result => {
        const products = result.payload;
        const objects = {products: products.map(prod => prod.toObject())};
        if (result.status === "success") {
            res.render("Home", objects)
        } else {res.status(500).send(result)}
    })
})
app.get("/productos/:category", passportCall("jwt"), (req, res) => {
    let cat = req.params.category;
    products.getByCategory(cat).then(result => {
        const products = result.payload;
        const objects = {products: products.map(prod => prod.toObject())};
        if (result.status === "success") {
            res.render("Category", objects);
        } else {res.status(500).send(result)}
    })
})

//APP.POST
app.post("/register", upload.single("avatar"), passportCall("register"), (req, res) => {
    const file = req.file;
    if(res.status === "error") {
        res.send({status: "error", message: "Usuario ya existente"})
    } else {
        res.send({status: "success", message: "Usuario registrado con éxito"})
    }
})
app.post("/login", passportCall("login"), (req, res) => {
    let user = req.user;
    let token = jwt.sign(user, envConfig.JWT_SECRET);
    res.cookie("JWT_COOKIE", token, {
        httpOnly: true,
        maxAge: 1000*60*60
    });
    res.send({status: "scuccess", message: "Login exitoso"});
})
app.post("/logout", (req, res) => {
    res.clearCookie("JWT_COOKIE");
    res.sendFile("logout.html", {root: __dirname + "/public/pages"});
})

let messages = [];
//CON EL SERVIDOR, CUANDO SE CONECTE EL SOCKET, HACE LO SIGUIENTE => {}
io.on("connection", async socket => {
    console.log("Se conectó socket " + socket.id);
    let prods = await products.getAll();
    socket.emit("deliverProducts", prods);
    socket.emit("messagelog", messages);
    socket.on("message", data => {
        //ACA INSERTAR MÉTODOS PARA MENSAJES
        chats.saveMessage(data)
        .then(result => console.log(result))
        .then(() => {
            chats.getAllMessages().then(result => {
            if (result.status === "success") {
                io.emit("message", result.payload)
            }
            })
        })
        messages.push(data);
        io.emit("messagelog", messages)
    })
})

app.use((req, res) => {
    logger.warn(`Método ${req.method} no disponible en ruta ${req.path}`);
    res.status(404).send({error: -2, message: "Ruta no implementada"});
})
import __dirname from "./utils.js";
import express from "express";
import Contenedor from "./contenedor/Contenedor.js";
//import Carrito from "./contenedor/Carrito.js";
import {chats, users} from "./daos/index.js";
import productsRouter from "./routes/products.js";
import carritoRouter from "./routes/carrito.js";
import chatsRouter from "./routes/chats.js";
import usersRouter from "./routes/users.js";
import randomsRouter from "./routes/randoms.js";
//import loginRouter from "./routes/login.js";
import {generate} from "./utils.js";
import {Server} from "socket.io";
import {engine} from "express-handlebars";
import cors from "cors";
import session from "express-session";
import MongoStore from "connect-mongo";
import initializePassportConfig from "./public/js/passport-config.js";
import passport from "passport";
import config from "./public/js/envConfig.js";
import {cwd, pid, version, title, platform, memoryUsage} from "process";

const contenedor = new Contenedor();
//const carrito = new Carrito();
const app = express();
const PORT = process.env.PORT || 8080;
const server = app.listen(PORT,() => {
    console.log("Listening on port: ", PORT)
});
const io = new Server(server);

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
app.use("/api/users", usersRouter);
app.use("/api/randoms", randomsRouter);
app.use(express.static(__dirname + "/public"));
app.use(session({
    secret: "nin4",
    store: MongoStore.create({mongoUrl: "mongodb+srv://Nina:123@ecommerce.b23tg.mongodb.net/sessions?retryWrites=true&w=majority"}),
    resave: false,
    saveUninitialized: false,
    cookie: {maxAge: 10000}
}));
initializePassportConfig();
app.use(passport.initialize());
app.use(passport.session());


//APP.ENGINE
//Para Handlebars
app.engine("handlebars", engine())

//APP.SET
app.set("views", __dirname + "/views");
//Para Handlebars
app.set("view engine", "handlebars");

//APP.GET
app.get("/", (req, res) => {
    res.sendFile("index.html", {root: __dirname + "/public/pages"});
});
app.get("/register", (req, res) => {
    res.sendFile("register.html", {root: __dirname + "/public/pages"});
});
app.get("/login", (req, res) => {
    res.sendFile("login.html", {root: __dirname + "/public/pages"});
});
app.get("/logged", (req, res) => {
    res.sendFile("logged.html", {root: __dirname + "/public/pages"});
});
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
    console.log(info);
    res.send(info);
});

app.get("/api/productos-test", (req, res) => {
    let quantity = req.query.quantity ? parseInt(req.query.quantity) : 10;
    let products = generate(quantity);
    res.render("ProductsTest", {prods: products});
});
app.get("/logged", (req, res) => {
    if(req.session.user) {
        res.send(req.session.user)
        res.sendFile("logged.html", {root: __dirname + "/public/pages"})
    } else {
        res.send({status: "error", message: "Error al loguearse"})
    }
});
app.get("/login/fb", (req, res) => {
    res.sendFile("fblogin.html", {root: __dirname + "/public/pages"});
});
app.get("/auth/facebook", passport.authenticate("facebook", {scope: ["emails"]}), (req, res) => {
});
app.get("/auth/facebook/callback", passport.authenticate("facebook", {failureRedirect:'/login-failure'}), (req, res) => {
    res.send({message:"Logueado"})
});

//APP.POST
app.post("/login", async (req, res) => {
    try {
        let {name, email} = req.body;
        if(!name || !email) {
            return res.satus(400).send({error: "Completa los campos"})
        }
        let user = await users.getByName(name);
        console.log(user);
        if (!user) return {status: "error", message: "Usuario no encontrado"};
        req.session.user = {
            name: user.payload.user.name,
            email: user.payload.user.email
        }
        res.send({status:"Logged"});
    } catch(error) {
        return {status: "error", message: error.message};
    }
})
app.post("/logout", (req, res) => {
    const user = req.session.user;
    req.session.user = null;
    res.send({status: "success", message: "Hasta luego"});
});

//HANDLEBARS
app.get("/productos", (req, res) => {
    contenedor.getAll().then(result => {
        const products = result.payload;
        const objects = {products: products};
        if (result.status === "success") {
            res.render("Home", objects)
        } else {res.status(500).send(result)}
    })
})

let messages = [];
//CON EL SERVIDOR, CUANDO SE CONECTE EL SOCKET, HACE LO SIGUIENTE => {}
io.on("connection", async socket => {
    console.log("Se conectó socket " + socket.id);
    let products = await contenedor.getAll();
    socket.emit("deliverProducts", products);
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
    res.status(404).send({error: -2, message: "Ruta no implementada"});
})
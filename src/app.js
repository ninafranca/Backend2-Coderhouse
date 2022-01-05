//import ChatMessages from "./services/ChatMessages.js";
import __dirname from "./utils.js";
import express from "express";
import Contenedor from "./contenedor/Contenedor.js";
import Carrito from "./contenedor/Carrito.js";
import productsRouter from "./routes/products.js";
import carritoRouter from "./routes/carrito.js";
import {Server} from "socket.io";
import {engine} from "express-handlebars";
import cors from "cors";

//const chatMessages = new ChatMessages();
const contenedor = new Contenedor();
const carrito = new Carrito();
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
app.use('/api/productos', productsRouter);
app.use('/api/carrito', carritoRouter);
app.use(express.static(__dirname + "/public"));

//APP.ENGINE
//Para Handlebars
app.engine("handlebars", engine());

//APP.SET
app.set("views", __dirname + "/views");
//Para Handlebars
app.set("view engine", "handlebars");

//APP.GET
app.get("/", (req, res) => {
    res.sendFile('index.html', {root: __dirname + "/public/html"});
})

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
        //ACA INSERTAR METODOS PARA MENSAJES
        chatMessages.saveMessage(data)
        .then(result => console.log(result))
        .then(() => {
            chatMessages.getAllMessages().then(result => {
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
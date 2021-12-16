/*import express from 'express';
import Contenedor from "./src/classes/Contenedor.js";
import Carrito from "./src/classes/Carrito.js";
import productsRouter from "./src/routes/products.js";
import carritoRouter from "./src/routes/carrito.js";
import __dirname from "./src/public/js/utils.js";
import {engine} from "express-handlebars"
import cors from "cors";
*/
const express = require("express");
const Contenedor = require("./classes/Contenedor");
const Carrito = require("./classes/Carrito");
const ChatMessages = require("./services/ChatMessages")
const contenedor = new Contenedor();
const chatMessages = new ChatMessages();
const carrito = new Carrito();
const productsRouter = require("./routes/products");
const carritoRouter = require("./routes/carrito");
//const __dirname = require("./public/js/utils");
const {engine} = require("express-handlebars");
const cors = require("cors");
const app = express();
const PORT = process.env.PORT || 8080;
const {Server} = require("socket.io");
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
app.use('/api/products', productsRouter);
app.use('/api/carrito', carritoRouter);
app.use(express.static(__dirname + '/public'));

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
/*app.get("/carrito", (req, res) => {
    if(req.auth !== false) {
        res.sendFile('carrito.html', {root: "./public/html"})
    } else {
        res.status(403).send("No autorizado")
    }
})*/

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
            chatMessages.getMessages().then(result => {
            if (result.status === "success") {
                io.emit("message", result.payload)
            }
            })
        })
        //messages.push(data);
        //io.emit("messagelog", messages)
    })
})

app.use((req, res) => {
    res.status(404).send({error: -2, message: "Ruta no implementada"});
})
const express = require("express");
const Contenedor = require("./classes/Contenedor");
const productsRouter = require("./routes/products");
const {engine} = require("express-handlebars");
const cors = require("cors");
/*import express from 'express';
import Contenedor from "./src/classes/Contenedor.js";
import productsRouter from "./src/routes/products.js";
import cors from "cors";
import {engine} from "express-handlebars"*/
const app = express();
const PORT = process.env.PORT || 8080;
const contenedor = new Contenedor();
const {Server} = require("socket.io");
const server = app.listen(PORT,() => {
    console.log("Listening on port: ", PORT)
});
const io = new Server(server);

//APP.USE
app.use(express.json());
app.use(cors());
app.use(express.urlencoded({extended:true}));
app.use('/api/products', productsRouter);
app.use(express.static('public'));

//APP.ENGINE
//Para Handlebars
app.engine("handlebars", engine());

//APP.SET
app.set("views", "./views");
//Para Handlebars
app.set("view engine", "handlebars");
//Para PUG
//app.set("view engine", "pug");
//Para Ejs
//app.set("view engine", "ejs");

//APP.GET
app.get("/", (req, res) => {
    res.sendFile('index.html', {root: './public/html'});
})
app.get("/chat", (req, res) => {
    res.sendFile('chat.html', {root: './public/html'});
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

//PUG Y EJS
/*app.get("/productos", (req, res) => {
    contenedor.getAll().then(result => {
        const products = result.payload;
        const objects = {products: products};
        if (result.status === "success") {
            res.render("products", objects)
        } else {res.status(500).send(result)}
    })
})*/

let messages = [];

//CON EL SERVIDOR, CUANDO SE CONECTE EL SOCKET, HACE LO SIGUIENTE => {}
io.on("connection", async socket => {
    console.log("Se conectó socket " + socket.id);
    let products = await contenedor.getAll();
    socket.emit("deliverProducts", products);
    //socket.emit("welcome", {message: "Bienvenido a mi servidor"});
    socket.emit("messagelog", messages);
    socket.on("message", data => {
        messages.push(data);
        io.emit("messagelog", messages)
    })
})

module.exports = {io}
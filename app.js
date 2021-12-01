const express = require("express");
const Contenedor = require("./src/classes/Contenedor");
const productsRouter = require("./src/routes/products");
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
})
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
app.set("views", "./src/views");
//Para Handlebars
app.set("view engine", "handlebars");
//Para PUG
//app.set("view engine", "pug");
//Para Ejs
//app.set("view engine", "ejs");

//APP.GET

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
app.get("/", (req, res) => {
    res.sendFile('index.html', {root: './src/public/html'});
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

//Prefiero usar Handlebars porque me parece el mas sencillo y con codigo mas limpio//

let messages = [];

//CON EL SERVIDOR, CUANDO SE CONECTE EL SOCKET, HACE LO SIGUIENTE => {}
io.on("connection", socket => {
    console.log("Se conectó un cliente");
    socket.emit("messagelog", messages)
    socket.emit("welcome", {message: "Bienvenido a mi servidor"});
    socket.on("message", data => {
        //console.log(data)
        messages.push(data);
        io.emit("messagelog", messages)
    })
})
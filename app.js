import express from 'express';
//import Contenedor from "./src/classes/Contenedor.js";
import productsRouter from "./src/routes/products.js";
import fs from "fs";
import {engine} from "express-handlebars";
const app = express();
import cors from "cors";
const PORT = process.env.PORT || 8080;
//const contenedor = new Contenedor();
const server = app.listen(PORT,() => {
    console.log("Listening on port: ", PORT)
})

//APP.USE
app.use(express.json());
app.use(cors());
app.use(express.urlencoded({extended:true}));
app.use('/api/products', productsRouter);
app.use(express.static('public'));

//APP.ENGINE
app.engine("handlebars", engine());

//APP.SET
app.set("views", "./src/views");
app.set("view engine", "handlebars");

//APP.GET
app.get("/productos", (req, res) => {
    //let objects = JSON.parse(fs.promises.readFile("/files/objects.txt", "utf-8"));
    let renderObjects = {
        arrayObjects: objects
    }
    res.render("Home", renderObjects)
})
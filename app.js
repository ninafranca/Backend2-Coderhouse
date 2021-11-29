import express, { application } from 'express';
import Contenedor from "./src/classes/Contenedor.js";
import productsRouter from "./src/routes/products.js";
import {engine} from "express-handlebars";
const app = express();
import cors from "cors";
const PORT = process.env.PORT || 8080;
const contenedor = new Contenedor();
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
//Para Handlebars
//app.engine("handlebars", engine());

//APP.SET
app.set("views", "./src/views");
//Para Handlebars
//app.set("view engine", "handlebars");
//Para PUG
//app.set("view engine", "pug");
//Para Ejs
app.set("view engine", "ejs");

//APP.GET

//HANDLEBARS
/*app.get("/productos", (req, res) => {
    contenedor.getAll().then(result => {
        const products = result.payload;
        const objects = {products: products};
        if (result.status === "success") {
            res.render("Home", objects)
        } else {res.status(500).send(result)}
    })
})*/

//Prefiero usar Handlebars porque me parece el mas sencillo y con codigo mas limpio//

//PUG Y EJS
app.get("/productos", (req, res) => {
    contenedor.getAll().then(result => {
        const products = result.payload;
        const objects = {products: products};
        if (result.status === "success") {
            res.render("products", objects)
        } else {res.status(500).send(result)}
    })
})
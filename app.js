import express from 'express';
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
app.engine("handlebars", engine());

//APP.SET
app.set("views", "./src/views");
app.set("view engine", "handlebars");

//APP.GET
app.get("/", (req, res) => {
    //res.render("/html/index.js")
})
app.get("/views/productos", (req, res) => {
    contenedor.getAll().then(result => {
        const products = result.payload;
        const objects = {products: products};
        if (result.status === "success") {
            res.render("Home", objects)
        } else {res.status(500).send(result)}
    })
})
import express from "express";
import ContenedorMemoria from "../../contenedor/ContenedorMemoria";
const container = new ContenedorMemoria();

export default class ProductsRouter extends express.Router {
    constructor() {
        super()
        this.get("/", (req, res) => {
            res.send();
        })
        this.post("/", (req, res) => {
            let products = container.generate();
        })
    }
}
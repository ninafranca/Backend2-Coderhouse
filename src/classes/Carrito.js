const { Console } = require("console");
const fs = require("fs");
const makeId = require("../public/js/utils");
let carts = [];

class Carrito {

    constructor () {
        this.fileLocation = "./files/carts.txt"
        this.productsFile = "./files/objects.txt"
    }

    async newCart() {
        try {
            const newCart = {
                ticket: makeId(5),
                date: new Date().toLocaleString(),
                products: []
            };
            carts = [...carts, newCart];
            await fs.promises.writeFile(this.fileLocation, JSON.stringify(carts, null, 2));
            return newCart;
        } catch (error) {
            return {status: "error", message: "Error al crear carrito"}
        }
    }

    async saveProdById(productId, ticket) {
        try {
            const fileProducts = await fs.promises.readFile(this.productsFile, "utf-8");
            const products = JSON.parse(fileProducts);
            const productToAdd = products.find(p => p.id === productId);
            const fileCarts = await fs.promises.readFile(this.fileLocation, "utf-8");
            const allCarts = JSON.parse(fileCarts);
            let carts = allCarts.find(c => c.ticket === ticket);
            console.log(carts);
            let otherCarts = allCarts.filter(c => c.ticket !== ticket);
            console.log(otherCarts);
            carts.products = [...carts.products, productToAdd];
            console.log(carts.products);
            carts = [...otherCarts, carts]
            await fs.promises.writeFile(this.fileLocation, JSON.stringify(carts, null, 2));
            return carts;
        } catch (err) {
            return { status: "error", message: "Error al añadir producto" };
        }
    }

    async getCart(ticket) {
        try {
            let readCarts = await fs.promises.readFile(this.fileLocation, "utf-8");
            let cart = JSON.parse(readCarts).filter(c => c.ticket === ticket);
            if(!cart) {
                throw new Error(`El carrito con id ${ticket} no existe`);
            } else {
                return cart;
            }
        } catch (error) {
            return {status: "error", message: "Error en obtener carrito"}
        }
    }

    async deleteCartById(cartId) {
        try {
            let readCarts = await fs.promises.readFile(this.fileLocation, "utf-8");
            let carts = JSON.parse(readCarts);
            const notId = carts.filter(c => c.ticket !== cartId);
            carts = [...notId];
            if (notId.length === 0) notId = "";
            await fs.promises.writeFile(this.fileLocation, JSON.stringify(carts, null, 2));
            return notId;
        } catch (error) {
            return {status: "error", message: "Error al borrar carrito"}
        }
    }

    async deleteCartProd(ticket, productId) {
        try {
            let fileCarts = await fs.promises.readFile(this.fileLocation, "utf-8");
            let carts = JSON.parse(fileCarts);
            let cart = carts.find(c => c.ticket === ticket);
            let otherCarts = carts.filter(c => c.ticket !== ticket);
            let products = cart.products.filter(c => c.id !== productId);
            cart.products = products;
            carts = [...otherCarts, cart];
            await fs.promises.writeFile(this.fileLocation, JSON.stringify(carts, null, 2));
            return carts
        } catch (err) {
            return { status: "error", message: "Error al borrar producto"}
        }
    }
        
}


module.exports = Carrito;
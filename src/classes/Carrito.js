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
            }
            carts = [...carts, newCart];
            await fs.promises.writeFile(this.fileLocation, JSON.stringify(carts, null, 2));
            return newCart
        } catch (error) {
            return {status: "error", message: "Error al crear carrito"}
        }
    }

    async saveProdById(productId, ticket) {
        try {
            let readCarts = await fs.promises.readFile(this.fileLocation, "utf-8");
            let cart = JSON.parse(readCarts).filter(c => c.ticket === ticket);
            let readProducts = await fs.promises.readFile(this.productsFile, "utf-8");
            let parsedProducts = JSON.parse(readProducts);
            let productById = parsedProducts.find(p => p.id === productId)
            cart.products = [...cart.products, productById]
            console.log("llegué");
            await fs.promises.writeFile(this.fileLocation, JSON.stringify(cart, null, 2));
            return cart;
        } catch (error) {
            return {status: "error", message: "Error al guardar el producto"}
        }
    }

    async getCart(ticket) {
        try {
            let readCarts = await fs.promises.readFile(this.fileLocation, "utf-8");
            let cart = JSON.parse(readCarts).filter(c => c.ticket === ticket);
            if(!cart) {
                throw new Error(`El carrito con id ${ticket} no existe`);
            } else {
                console.log(cart)
                return cart;
            }
        } catch (error) {
            return {status: "error", message: "Error con el carrito"}
        }
    }

    async deleteProdByCartId(cartId, productId) {
        try {
            const cart = getCart(cartId);
            let products = [...cart.products];
            const productIndex = products.indexOf(p => p.id === productId);
            products.splice(productIndex, 1);
            cart.products = products;
            await fs.promises.writeFile(this.fileLocation, JSON.stringify(cart.products, null, 2));
            return cart 
        } catch (error) {
            return {status: "error", message: "Error al borrar producto"}
        }
    }

    async deleteCartById(cartId) {
        try {
            let readCarts = await fs.promises.readFile(this.fileLocation, "utf-8");
            let carts = JSON.parse(readCarts);
            const notId = carts.filter(c => c.ticket !== cartId);
            carts = [...notId]
            if (notId.length === 0) notId = "";
            await fs.promises.writeFile(this.fileLocation, JSON.stringify(carts, null, 2));
            return notId;
        } catch (error) {
            return {status: "error", message: "Error al borrar carrito"}
        }
    }
}

module.exports = Carrito;
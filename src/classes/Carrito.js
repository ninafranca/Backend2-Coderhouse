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
            const fileProducts = await fs.promises.readFile(this.productsFile, 'utf-8')
            const products = JSON.parse(fileProducts)
            const productToAdd = products.find(p => p.id === productId)
      
            const fileCarts = await fs.promises.readFile(this.fileLocation, 'utf-8')
            const carts = JSON.parse(fileCarts).find(c => c.ticket === ticket)
            carts.products = [
              ...carts.products,
              productToAdd
            ]
      
            await fs.promises.writeFile(this.fileLocation, JSON.stringify(carts, null, 2))
            return { status: 'success', payload: 'Product has been added successfully.' }
          } catch (err) {
            console.log(`Product add error: ${err.message}`)
            return { status: 'error', message: 'Product add error.' }
          }
        /*try {
            let readCarts = await fs.promises.readFile(this.fileLocation, "utf-8");
            let cart = JSON.parse(readCarts).filter(c => c.ticket === ticket);
            let readProducts = await fs.promises.readFile(this.productsFile, "utf-8");
            let parsedProducts = JSON.parse(readProducts);
            let products = cart.products
            let productById = parsedProducts.find(p => p.id === productId)
            console.log(1);
            console.log(2);
            let allProds = [...products, productById]
            cart = {...cart, products: allProds}
            console.log(3);
            console.log(productById);
            console.log(cart);
            console.log("llegué");
            await fs.promises.writeFile(this.fileLocation, JSON.stringify(cart, null, 2));
            return cart;
        } catch (error) {
            return {status: "error", message: "Error al guardar el producto"}
        }*/
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

    async deleteCartProd(ticket, productId) {
        try {
            let fileCarts = await fs.promises.readFile(this.fileLocation, 'utf-8')
            let carts = JSON.parse(fileCarts);
            let cart = carts.find(c => c.ticket === ticket);
            let otherCarts = carts.filter(c => c.ticket !== ticket);
            console.log(cart);
            let products = cart.products.filter(c => c.id !== productId)
            cart.products = products
            carts = [...otherCarts, cart]
            await fs.promises.writeFile(this.fileLocation, JSON.stringify(carts, null, 2))
            return { status: 'success', payload: 'Product has been deleted successfully.' }
          } catch (err) {
            console.log(`Product add error: ${err.message}`)
            return { status: 'error', message: 'Product add error.' }
          }
        /*
        try {
            let readCarts = await fs.promises.readFile(this.fileLocation, "utf-8");
            let cart = JSON.parse(readCarts).filter(c => c.ticket === ticket);
            console.log(1);
            console.log(cart);
            let products = cart.products;
            console.log(2);
            let notProduct = products.filter(p => p.id !== productId);
            console.log(3);
            console.log(notProduct);
            notProduct = cart.products;
            await fs.promises.writeFile(this.fileLocation, JSON.stringify(cart, null, 2));
            return cart
        } catch (error) {
            return {status: "error", message: "Error al borrar producto"}
        }
        */
    }
        
}


module.exports = Carrito;
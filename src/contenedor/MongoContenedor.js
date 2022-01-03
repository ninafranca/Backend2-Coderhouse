import mongoose from "mongoose";
import config from "../public/js/config.js";

mongoose.connect(config.mongo.baseUrl, {useNewUrlParser: true, useUnifiedTopology: true});

export default class MongoContenedor {

    constructor(collection, schema, timestamps) {
        this.collection = mongoose.model(collection, new mongoose.Schema(schema, timestamps))
    }

    //MÉTODOS PRODUCTOS
    async getAll() {
        try {
            const readFile = await this.collection.find();
            return {status: "success", payload: readFile}
        } catch(error) {
            return {status: "error", message: "Error buscando productos"}
        }
    }

    async getById(id) {
        try {
            const product = await this.collection.findById(id);
            if(!product) {
                return {status: "error", message: "Producto no encontrado"}
            } else {
                return {status: "success", payload: product}
            }
        } catch(error) {
            return {status: "error", message: "Error buscando el producto" + error}
        }
    }

    async save(product) {
        try {
            let exists = await this.collection.findOne({title: {$eq: product.title}});
            if (exists) {
                return {status: "error", message: "El producto ya existe"}
            }
            let newProduct = await this.collection.create(product);
            return {status: "success", payload: newProduct}
        } catch(error) {
            return {status: "error", message: "Error al guardar producto"}
        }
    }

    async updateObject(id, body) {
        try {
            let product = await this.collection.findById(id);
            if(product) {
                let updatedProduct = await product.updateOne(body);
                return {status: "success", message: "Producto actualizado exitosamente"};
            }
            return {status: "error", message: "No hay productos con el id especificado"}
        } catch(error) {
            return {status: "error", message: "Fallo al actualizar el producto: " + error}
        }
    }

    async deleteById(id) {
        try {
            let products = await this.collection.find();
            let product = await this.collection.findById(id)
            if(product) {
                let deletedProduct = await this.collection.findByIdAndDelete(id);
                return {status: "success", payload: product}
            }
            return {status: "error", message: "Producto no encontrado"}
        } catch(error) {
            return {status: "error", message: error}
        }
    }

    //METODOS CARRITO
    async newCart() {
        try {
            const newCart = {
                id: makeId(5),
                date: new Date().toLocaleString(),
                products: []
            };
            carts = [...carts, newCart];
            await fs.promises.writeFile(this.url, JSON.stringify(carts, null, 2));
            return newCart;
        } catch(error) {
            return {status: "error", message: "Error al crear carrito"}
        }
    }

    //Agrego validación si ya existe el producto en el carrito
    async saveProdById(productId, id) {
        try {
            const fileProducts = await fs.promises.readFile(this.productsFile, "utf-8");
            const products = JSON.parse(fileProducts);
            const productToAdd = products.find(p => p.id === productId);
            const fileCarts = await fs.promises.readFile(this.url, "utf-8");
            const allCarts = JSON.parse(fileCarts);
            let carts = allCarts.find(c => c.id === id);
            let otherCarts = allCarts.filter(c => c.id !== id);
            let cartProduct = carts.products.find(p => p.id === productId);
            console.log(cartProduct);
            if(cartProduct) {
                return "Producto ya existente en carrito"
            } else {
                carts.products = [...carts.products, productToAdd];
                carts = [...otherCarts, carts]
                await fs.promises.writeFile(this.url, JSON.stringify(carts, null, 2));
                return carts;
            }
        } catch(err) {
            return { status: "error", message: "Error al añadir producto" };
        }
    }

    async getCart(id) {
        try {
            let readCarts = await fs.promises.readFile(this.url, "utf-8");
            let cart = JSON.parse(readCarts).find(c => c.id === id).products;
            if(!cart) {
                throw new Error(`El carrito con id ${id} no existe`);
            } else {
                return cart;
            }
        } catch(error) {
            return {status: "error", message: "Error al obtener carrito"}
        }
    }

    async deleteCartById(cartId) {
        try {
            let readCarts = await fs.promises.readFile(this.url, "utf-8");
            let carts = JSON.parse(readCarts);
            const notId = carts.filter(c => c.id !== cartId);
            carts = [...notId];
            if (notId.length === 0) notId = "";
            await fs.promises.writeFile(this.url, JSON.stringify(carts, null, 2));
            return notId;
        } catch(error) {
            return {status: "error", message: "Error al borrar carrito"}
        }
    }

    async deleteCartProd(id, productId) {
        try {
            let fileCarts = await fs.promises.readFile(this.url, "utf-8");
            let carts = JSON.parse(fileCarts);
            let cart = carts.find(c => c.id === id);
            let otherCarts = carts.filter(c => c.id !== id);
            let products = cart.products.filter(c => c.id !== productId);
            cart.products = products;
            carts = [...otherCarts, cart];
            await fs.promises.writeFile(this.url, JSON.stringify(carts, null, 2));
            return carts
        } catch(error) {
            return { status: "error", message: "Error al borrar producto"}
        }
    }

}
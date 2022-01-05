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
            return {status: "error", message: "Error buscando el producto"}
        }
    }

    async save(product) {
        try {
            let exists = await this.collection.findOne({title: {$eq: product.title}});
            if(exists) {
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
                await product.updateOne(body);
                return {status: "success", message: "Producto actualizado exitosamente"};
            }
            return {status: "error", message: "No hay productos con el id especificado"}
        } catch(error) {
            return {status: "error", message: "Fallo al actualizar el producto: "}
        }
    }

    async deleteById(id) {
        try {
            let product = await this.collection.findById(id)
            if(product) {
                await this.collection.findByIdAndDelete(id);
                return {status: "success", message: "Producto borrado exitosamente"}
            }
            return {status: "error", message: "Producto inexistente"}
        } catch(error) {
            return {status: "error", message: "Error borrando producto"}
        }
    }

    //METODOS CARRITO
    async newCart() {
        try {
            let cart = await this.collection.create({products: []});
            return {status: "success", payload: cart}
        } catch(error) {
            return {status: "error", message: "Error al crear carrito"}
        }
    }

    //Agrego validación si ya existe el producto en el carrito
    async saveProdById(productId, id) {
        try {
            let cartProduct = await this.collection.findById(id).findOne({products: productId});
            if(cartProduct) {
                return {status: "error", message: "Producto ya existente en carrito"}
            } else {
                await this.collection.findByIdAndUpdate(id, {$push: {products: productId }});
                return {status: "success", message: "El producto se ha guardado exitosamente"};
            }
        } catch(error) {
            return {status: "error", message: "Error al añadir producto"};
        }
    }

    async getCart(id) {
        try {
            let cart = await this.collection.findById(id);
            if(!cart) {
                return {status: "error", message: "El carrito no existe"}
            } else {
                return {status: "success", payload: cart};
            }
        } catch(error) {
            return {status: "error", message: "Error al obtener carrito" + error}
        }
    }

    async deleteCartById(cartId) {
        try {
            let cart = await this.collection.findById(cartId);
            if (!cart) {
                return {status: "error", message: "El carrito no existe"};
            } else {
                await this.collection.findByIdAndDelete(cartId);
                return {status: "success", message: "El carrito se ha borrado exitosamente"};
            }
        } catch(error) {
            return {status: "error", message: "Error al borrar carrito"};
        }
    }

    async deleteCartProd(cartId, productId) {
        try {
            let cart = await this.collection.findById(cartId);
            if (!cart) {
                return {status: "error", message: "No existe el carrito especificado"};
            } else {
                const product = await this.collection.findById(cartId).findOne({products: productId});
                if (!product) {
                    return {status: "error", message: "El producto no existe en el carrito"};
                } else {
                    await this.collection.findByIdAndUpdate(cartId, {$pull: { products: productId}})
                    return {status: "success", message: "El producto se ha borrado exitosamente del carrito"}
                }
            }
        } catch(error) {
        return {status: 'error', message: "Error al borrar producto del carrito"}
        }
    }

}
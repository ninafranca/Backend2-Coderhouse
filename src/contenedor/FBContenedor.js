import admin from "firebase-admin";
import {createRequire} from 'module';
//import serviceAccount from "../db/ecommerce-f628b-firebase-adminsdk-h2evm-45e406a98c.json";

const require = createRequire(import.meta.url);
const serviceAccount = require("../db/ecommerce-f628b-firebase-adminsdk-h2evm-45e406a98c.json");

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    //"https://BASE.firebaseio.com" <-- en BASE va el nombre de mi coleccion
    databaseURL: "https://ecommerce-f628b.firebaseio.com"
});

const db = admin.firestore();

export default class FBContenedor {

    constructor(collection) {
        this.collection = db.collection(collection)
    }

    //MÉTODOS PRODUCTOS
    async getAll() {
        try {
            const data = await this.collection.get();
            const products = data.docs.map(p => {
                let product = p.data()
                product.id = p.id
                return product
            });
            return {status: "success", payload: products};
        } catch(error) {
            return {status: "error", message: "Error buscando productos"};
        }
    }

    async getById(id) {
        try {
            const data = await this.collection.doc(id).get();
            const product = data.data();
            if(!product) {
                return {status: "error", message: "El producto no existe"};
            } else {
                product.id = data.id;
                return {status: "success", payload: product};
            }
        } catch(error) {
            return {status: "error", message: "Error buscando el producto"};
        }
    }

    async save(product) {
        try {
            const exists = await this.collection.where("title", "==", product.title).get();
            if(!exists.empty) {
                return {status: "error", message: "El producto ya existe"};
            } else {
                product.stock = parseInt(product.stock);
                product.price = parseInt(product.price);
                let newProduct = await this.collection.add(product);
                return {status: "success", message: "El producto se ha creado exitosamente"};
            }
        } catch(error) {
            return {status: "error", message: error.message};
        }
    }

    async updateObject(id, body) {
        try {
            const collection = this.collection.doc(id);
            let data = await collection.get();
            let product = data.data();
            if (!product) {
                return {status: "error", message: "El producto no existe"};
            } else {
                body.stock = parseInt(body.stock);
                body.price = parseInt(body.price);
                await collection.update(body);
                return {status: "success", message: "El producto se ha actualizado exitosamente"};
            }
        } catch(error) {
            return {status: "error", message: "Error al actualizar producto"}
        }
    }

    async deleteById(id) {
        try {
            const collection = this.collection.doc(id)
            const result = await collection.get();
            const product = result.data();
            if(!product) {
                return {status: "error", message: "El producto no existe"};
            } else {
                await collection.delete();
                return {status: "success", message: "El producto se ha borrado exitosamente"}
            }
        } catch(error) {
            return {status: "error", message: error.message}
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
                return {status: "error", payload: cart};
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

/*
class ContenedorFirebase {

    constructor(nombreColeccion) {
        this.coleccion = db.collection(nombreColeccion)
    }

    async listar(id) {
        try {
            const doc = await this.coleccion.doc(id).get();
            if (!doc.exists) {
                throw new Error(`Error al listar por id: no se encontró`)
            } else {
                const data = doc.data();
                return { ...data, id }
            }
        } catch (error) {
            throw new Error(`Error al listar por id: ${error}`)
        }
    }

    async listarAll() {
        try {
            const result = []
            const snapshot = await this.coleccion.get();
            snapshot.forEach(doc => {
                result.push({ id: doc.id, ...doc.data() })
            })
            return result
        } catch (error) {
            throw new Error(`Error al listar todo: ${error}`)
        }
    }

    async guardar(nuevoElem) {
        try {
            const guardado = await this.coleccion.add(nuevoElem);
            return { ...nuevoElem, id: guardado.id }
        } catch (error) {
            throw new Error(`Error al guardar: ${error}`)
        }
    }

    async actualizar(nuevoElem) {
        try {
            const actualizado = await this.coleccion.doc(nuevoElem.id).set(nuevoElem);
            return actualizado
        } catch (error) {
            throw new Error(`Error al actualizar: ${error}`)
        }
    }

    async borrar(id) {
        try {
            const item = await this.coleccion.doc(id).delete();
            return item
        } catch (error) {
            throw new Error(`Error al borrar: ${error}`)
        }
    }

    async borrarAll() {
        // version fea e ineficiente pero entendible para empezar
        try {
            const docs = await this.listarAll()
            const ids = docs.map(d => d.id)
            const promesas = ids.map(id => this.borrar(id))
            const resultados = await Promise.allSettled(promesas)
            const errores = resultados.filter(r => r.status == 'rejected')
            if (errores.length > 0) {
                throw new Error('no se borró todo. volver a intentarlo')
            }
            // const ref = firestore.collection(path)
            // ref.onSnapshot((snapshot) => {
            //     snapshot.docs.forEach((doc) => {
            //         ref.doc(doc.id).delete()
            //     })
            // })
        } catch (error) {
            throw new Error(`Error al borrar: ${error}`)
        }
    }

    async desconectar() {
    }
}

export default ContenedorFirebase*/
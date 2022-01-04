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
        this.collection = db.collection(collection);
        this.productsColl = db.collection("productos");
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
            return {status: "error", message: "Error al actualizar producto"};
        }
    }

    async deleteById(id) {
        try {
            const collection = this.collection.doc(id);
            const result = await collection.get();
            const product = result.data();
            if(!product) {
                return {status: "error", message: "El producto no existe"};
            } else {
                await collection.delete();
                return {status: "success", message: "El producto se ha borrado exitosamente"};
            }
        } catch(error) {
            return {status: "error", message: error.message};
        }
    }

    //METODOS CARRITO
    async newCart() {
        try {
            const cart = await this.collection.add({products: []});
            return {status: "success", message: "El carrito ha sido creado con éxito"}
        } catch(error) {
            return {status: "error", message: "Eror al crear carrito"}
        }
    }

    async saveProdById(productId, id) {
        try {
            const collection = await this.collection.doc(id).get();
            let cart = collection.data();
            if(!cart) {
                return {status: "error", message: "El carrito no existe"};
            } else {
                let productData = await this.productsColl.doc(productId).get();
                let product = productData.data();
                if (!product) {
                    return {status: "error", message: "El producto no existe"};
                } else {
                    product.id = productId;
                    let prodInCart = cart.products.find(p => p.id === productId);
                    if(prodInCart) {
                        return {status: "error", message: "El producto ya existe en el carrito"};
                    } else {
                        const products = [
                            ...cart.products,
                            product.id
                        ];
                        await this.collection.doc(id).set({products: products});
                        return {status: "success", message: "El producto se ha guardado exitosamente"};
                    }
                }
            }
        } catch(error) {
            return {status: "error", message: error.message};
        }
    }

    async getCart(id) {
        try {
            const collection = await this.collection.doc(id).get();
            const cart = collection.data();
            if(!cart) {
                return {status: "error", message: "El carrito no existe"};
            } else {
                const products = cart.products;
                return {status: 'success', payload: products};
            }
        } catch(error) {
            return {status: "error", message: "Error al obtener producto"};
        }
    }

    async deleteCartById(cartId) {
        try {
            const collection = this.collection.doc(cartId);
            const cartObject = await collection.get();
            const cart = cartObject.data();
            if (!cart) {
                return {status: "error", message: "El carrito no existe"};
            } else {
                await collection.delete();
                return {status: "success", message: "El carrito ha sido borrado exitosamente"};
            }
        } catch(error) {
            return { status: 'error', message: "Error al borrar el carrito" }
        }
    }
    

    async deleteCartProd(cartId, productId) {
        try {
            const collection = await this.collection.doc(cartId).get();
            let cart = collection.data();
            if (!cart) {
                return {status: "error", message: "El carrito no existe"};
            } else {
                let product = cart.products.filter(p => p.id === productId);
                if(!product) {
                    return {status: "error", message: "El producto no existe en el carrito"};
                } else {
                    let notProduct = cart.products.filter(p => p.id !== productId);
                    console.log(notProduct);
                    await this.collection.doc(cartId).set({products: notProduct});
                    return {status: "success", message: "El producto se ha borrado del carrito"};
                }
            }
          } catch(error) {
                return {status: "error", message: error.message}
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
}*/
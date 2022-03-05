import mongoose from "mongoose";
import config from "../public/js/config.js";
import {normalize, denormalize, schema} from "normalizr";
import createLogger from "../public/js/winston.js";

const logger = createLogger(process.env.NODE_ENV);

export default class MongoContenedor {

    constructor(collection, schema, timestamps) {
        this.collection = mongoose.model(collection, new mongoose.Schema(schema, timestamps))
    }

    //MÉTODOS PRODUCTOS
    async getAll() {
        try {
            const readFile = await this.collection.find();
            logger.info(`Productos: ${readFile}`);
            //return {status: "success", payload: readFile}
        } catch(error) {
            logger.error("Error buscando productos");
            return {status: "error", message: "Error buscando productos"}
        }
    }

    async getById(id) {
        try {
            const product = await this.collection.findById(id);
            if(!product) {
                logger.error("Producto no encontrado");
                return {status: "error", message: "Producto no encontrado"}
            } else {
                logger.info(`Producto: ${product}`);
                //return {status: "success", payload: product}
            }
        } catch(error) {
            logger.error("Error buscando el producto");
            return {status: "error", message: "Error buscando el producto"}
        }
    }

    async save(product) {
        try {
            let exists = await this.collection.findOne({title: {$eq: product.title}});
            if(exists) {
                logger.error("No es posible guardar el producto porque ya existe");
                return {status: "error", message: "El producto ya existe"}
            }
            let newProduct = await this.collection.create(product);
            logger.info(`Producto guardado: ${newProduct}`);
            //return {status: "success", payload: newProduct}
        } catch(error) {
            logger.error("Error al guardar el producto");
            return {status: "error", message: "Error al guardar producto"}
        }
    }

    async updateObject(id, body) {
        try {
            let product = await this.collection.findById(id);
            if(product) {
                await product.updateOne(body);
                logger.info(`Producto actualizado: ${product}`);
                //return {status: "success", message: "Producto actualizado exitosamente"};
            }
            logger.error("No hay productos con el id especificado");
            return {status: "error", message: "No hay productos con el id especificado"}
        } catch(error) {
            logger.error("Fallo al actualizar el producto");
            return {status: "error", message: "Fallo al actualizar el producto: " + id}
        }
    }

    async deleteById(id) {
        try {
            let product = await this.collection.findById(id)
            if(product) {
                await this.collection.findByIdAndDelete(id);
                logger.info(`Producto borrado: ${product}`);
                //return {status: "success", message: "Producto borrado exitosamente"}
            }
            logger.error("Producto inexistente");
            return {status: "error", message: "Producto inexistente"}
        } catch(error) {
            logger.error("Error borrando el producto");
            return {status: "error", message: "Error borrando el producto"}
        }
    }

    //MÉTODOS CARRITO
    async newCart() {
        try {
            let cart = await this.collection.create({products: []});
            logger.info(`Nuevo carrito: ${cart}`);
            //return {status: "success", payload: cart}
        } catch(error) {
            logger.error("Error al crear carrito");
            return {status: "error", message: "Error al crear carrito"}
        }
    }

    //Agrego validación si ya existe el producto en el carrito
    async saveProdById(productId, id) {
        try {
            let cartProduct = await this.collection.findById(id).findOne({products: productId});
            if(cartProduct) {
                logger.error("Producto ya existente en carrito");
                return {status: "error", message: "Producto ya existente en carrito"}
            } else {
                let product = await this.collection.findByIdAndUpdate(id, {$push: {products: productId }});
                logger.info(`Producto guardado exitosamente: ${product}`);
                //return {status: "success", message: "El producto se ha guardado exitosamente"};
            }
        } catch(error) {
            logger.error("Error al añadir producto");
            return {status: "error", message: "Error al añadir producto"};
        }
    }

    async getCart(id) {
        try {
            let cart = await this.collection.findById(id);
            if(!cart) {
                logger.error("El carrito no existe");
                return {status: "error", message: "El carrito no existe"}
            } else {
                logger.info(`Carrito: ${cart}`);
                //return {status: "success", payload: cart};
            }
        } catch(error) {
            logger.error("Error al obtener carrito");
            return {status: "error", message: "Error al obtener carrito" + error}
        }
    }

    async deleteCartById(cartId) {
        try {
            let cart = await this.collection.findById(cartId);
            if (!cart) {
                logger.error("El carrito no existe");
                return {status: "error", message: "El carrito no existe"};
            } else {
                await this.collection.findByIdAndDelete(cartId);
                logger.info(`Carrito borrado exitosamente: ${cart}`);
                //return {status: "success", message: "El carrito se ha borrado exitosamente"};
            }
        } catch(error) {
            logger.error("Error al borrar carrito");
            return {status: "error", message: "Error al borrar carrito"};
        }
    }

    async deleteCartProd(cartId, productId) {
        try {
            let cart = await this.collection.findById(cartId);
            if (!cart) {
                logger.error("No existe el carrito especificado");
                return {status: "error", message: "No existe el carrito especificado"};
            } else {
                const product = await this.collection.findById(cartId).findOne({products: productId});
                if (!product) {
                    logger.error("El product no existe en el carrito");
                    return {status: "error", message: "El producto no existe en el carrito"};
                } else {
                    await this.collection.findByIdAndUpdate(cartId, {$pull: { products: productId}});
                    logger.info(`El producto ${product} se ha borrado exitosamente del carrito ${cartId}`);
                    //return {status: "success", message: "El producto se ha borrado exitosamente del carrito"}
                }
            }
        } catch(error) {
            logger.error("Error al borrar producto del carrito");
        return {status: 'error', message: "Error al borrar producto del carrito"}
        }
    }

    //MÉTODOS CHAT
    async getAllMessages() {
        try {
            const readFile = await this.collection.find();
            if(!readFile) {
                logger.error("No hay mensajes");
                return {status: "error", message: "No hay mensajes"};
            } else {
                logger.info(`Mensajes: ${readFile}`);
                //return {status: "success", payload: readFile};
            } 
        } catch(error) {
            logger.error("Error leyendo los mensajes");
            return {status: "error", message: "Error leyendo los mensajes"};
        }
    }

    async saveMessage(message) {
        try {
            const readFile = await this.collection.find();
            if(!readFile) {
                await this.collection.create();
                await this.collection.create(message);
            } else {
                await this.collection.create(message);
                let id=1
                for (let message of readFile) {
                    message.id=id
                    id++
                }
                const data= {
                    "id": id,
                    "mensajes": JSON.parse(JSON.stringify(readFile))
                }
                const authorSchema= new schema.Entity("authors")
                const messageSchema= new schema.Entity("messages",{
                    author: authorSchema
                })
                const chatSchema= new schema.Entity("chats",{
                    author: authorSchema,
                    mensajes: [messageSchema]
                })
                const normalizedData= normalize(data,chatSchema)
                //const denormalizedData = denormalize(data.result, chatSchema, data.entities);
                logger.info(`Nuevo mensaje: ${normalizedData}`);
                //return {status: "success", payload: normalizedData};
            }
        } catch(error) {
            logger.error("No se ha podido guardar el mensaje");
            return {status: "error", message: "No se ha podido guardar el mensaje"};
        }
    }

    //MÉTODOS USERS
    async getUsers() {
        try {
            const readFile = await this.collection.find();
            if(!readFile) {
                logger.error("No hay usuarios");
                return {status: "error", message: "No hay usuarios"};
            } else {
                logger.info(`Usuarios: ${readFile}`);
                //return {status: "success", payload: readFile};
            } 
        } catch(error) {
            logger.error("Error leyendo los usuarios");
            return {status: "error", message: "Error leyendo los usuarios"};
        }
    }

    async saveUser(user) {
        try {
            const readFile = await this.collection.find();
            if(!readFile) {
                await this.collection.create();
                let exists = await this.collection.findOne({email: user.email});
                logger.error("Ya existe usuario con mismo e-mail");
                if(exists) return {status: "error", message: "Ya existe usuario con mismo e-mail"};
                await this.collection.create(user);
            } else {
                let exists = await this.collection.findOne({email: user.email});
                console.log(exists);
                if(exists) {
                    logger.error("Ya existe usuario con mismo e-mail");
                    return {status: "error", message: "Ya existe usuario con mismo e-mail"};
                } else {
                    let newUser = await this.collection.create(user);
                    logger.info(`Usuario nuevo: ${newUser}`);
                    //return {status: "success", payload: newUser};
                }
            }
        } catch(error) {
            return {status: "error", message: error.message};
        }
    }

    async getByName(name) {
        try {
            console.log(0);
            console.log(this.collection)
            const userFound = await this.collection.findOne({name: name});
            console.log(1);
            console.log(userFound);
            if(!userFound) {
                logger.error("No existe el usuario");
                return {status: "error", message: "No existe el usuario"};
            } else {
                logger.info(`Usuario encontrado: ${userFound}`);
                //return {status: "success", payload: userFound};
            } 
        } catch(error) {
            logger.error("Error obteniendo usuario");
            return {status: "error", message: "Error obteniendo usuario"};
        }
    }

}
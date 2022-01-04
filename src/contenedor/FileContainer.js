import fs from "fs";
import config from "../public/js/config.js";

class FileContainer {

    constructor(file_endpoint) {
        this.url = `${config.fileSystem.baseUrl}${file_endpoint}`
    }

    //MÉTODOS PRODUCTOS
    async getAll() {
        try {
            const readFile = await fs.promises.readFile(this.url, "utf-8")
            if (!readFile) {
                throw new Error("No hay productos")
            } else {   
                return {status: "success", payload: JSON.parse(readFile)}
            }
        } catch(error) {
            return {status: "error", message: "Error buscando productos"}
        }
    }

    async getById(id) {
        try {
            if(!id) throw new Error("Falta parámetro")
            const readFile = await fs.promises.readFile(this.url, "utf-8")
            if(!readFile) {
                throw new Error("No hay productos")
            } else {
                const data = JSON.parse(readFile).find(e => e.id === id)
                if(!data) {
                    throw new Error("Producto no encontrado")
                } else {
                    return {status: "success", payload: data}
                }
            }
        } catch(error) {
            return {status: "error", message: "Error buscando el producto"}
        }
    }
  
    async save(product) {
        try {
            if(Object.keys(product).length === 0) {
                throw new Error("Falta parámetro")
            }
            const readFile = await fs.promises.readFile(this.url, "utf-8")
            let products = []
            let id = 1
            let timestamp = new Date().toLocaleString()
            if(readFile) {
            products = JSON.parse(readFile)
            const ids = products.map(product => product.id)
            const maxId = Math.max(...ids)
            id = maxId + 1
            const hasProduct = products.find(e => e.title === product.title)
            if(hasProduct) throw new Error("El producto ya existe")
            }
            let dataObj = {
                id: id,
                title : product.title,
                timestamp: timestamp,
                description: product.description,
                code: makeId(5),
                price: product.price,
                thumbnail: product.thumbnail,
                stock: product.stock? product.stock : 0
            }
            products = [...products, dataObj]
            await fs.promises.writeFile(this.url, JSON.stringify(products, null, 2))
            return {status: "success", payload: product}
        } catch(error) {
            return {status: "error", message: "Error al guardar producto"}
        }
    }
  
    async updateObject(id, body) {
        try {
            let data = await fs.promises.readFile(this.url,"utf-8");
            let prods = JSON.parse(data);
            if(!prods.some(p => p.id === id)) return {status: "error", message: "No hay productos con el id especificado"}
            let result = prods.map(prod => {
                if(prod.id === id){
                    body = Object.assign({id: id, ...body})
                    return body;
                } else {
                    return prod;
                }
            })
            try {
                await fs.promises.writeFile(this.url, JSON.stringify(result, null, 2));
                return {status: "success", message: "Producto actualizado"}
            } catch {
                return {status:"error", message: "Error al actualizar el producto"}
            }
        } catch(error) {
            return {status: "error", message: "Fallo al actualizar el producto: " + error}
        }
    }

    async deleteById(id) {
        try {
            const readFile = await fs.promises.readFile(this.url, "utf-8")
            let products = JSON.parse(readFile)
            const idFound = products.find(e => e.id === id)
            if(!idFound) throw new Error(`ID '${id}' no encontrado`)
            let newProducts = products.filter(e => e.id !== id)
            if(newProducts.length === 0) newProducts = ''
            await fs.promises.writeFile(this.url, JSON.stringify(newProducts, null, 2))
            return {status: "success", message: "Producto borrado"}
        } catch(error) {
            return {status: "error", message: "Error al borrar producto"}
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

export default FileContainer;
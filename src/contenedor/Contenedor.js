import fs from "fs";
import makeId from "../utils.js";

class Contenedor {
    
    constructor() {
        this.fileLocation = "./src/files/objects.txt"
    }
  
    async getAll() {
        try {
            const readFile = await fs.promises.readFile(this.fileLocation, 'utf-8')
            if (!readFile) {
                throw new Error("No hay productos")
            } else {   
                return {status: "success", payload: JSON.parse(readFile)}
            }
        } catch (err) {
            return {status: "error", message: "Error buscando productos"}
        }
    }
  
    async getById(id) {
        try {
            if(!id) throw new Error("Falta parámetro")
            const readFile = await fs.promises.readFile(this.fileLocation, "utf-8")
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
        } catch(err) {
            return {status: "error", message: "Error buscando el producto"}
        }
    }
  
    async save(product) {
        try {
            if(Object.keys(product).length === 0) {
                throw new Error("Falta parámetro")
            }
            const readFile = await fs.promises.readFile(this.fileLocation, "utf-8")
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
            await fs.promises.writeFile(this.fileLocation, JSON.stringify(products, null, 2))
            return {status: "success", payload: product}
        } catch(err) {
            return {status: "error", message: "Error al guardar producto"}
        }
    }
  
    async updateObject(id, body) {
        try {
            let data = await fs.promises.readFile(this.fileLocation,"utf-8");
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
                await fs.promises.writeFile(this.fileLocation, JSON.stringify(result, null, 2));
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
            const readFile = await fs.promises.readFile(this.fileLocation, "utf-8")
            let products = JSON.parse(readFile)
            const idFound = products.find(e => e.id === id)
            if(!idFound) throw new Error(`ID '${id}' no encontrado`)
            let newProducts = products.filter(e => e.id !== id)
            if(newProducts.length === 0) newProducts = ''
            await fs.promises.writeFile(this.fileLocation, JSON.stringify(newProducts, null, 2))
            return {status: "success", message: "Producto borrado"}
        } catch(err) {
            return {status: "error", message: "Error al borrar producto"}
        }
    }
}
  
export default Contenedor;
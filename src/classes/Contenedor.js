import fs from "fs";
//const makeId = require('../utils/utils')
//import appRoot from "app-root-path"

class Contenedor {
    constructor () {
      this.fileLocation = "src/files/objects.txt"
    }
  
    async getAll () {
      try {
        const readFile = await fs.promises.readFile(this.fileLocation, 'utf-8')
        if (!readFile) throw new Error('The document is empty!')
        return { status: 'success', payload: JSON.parse(readFile) }
      } catch (err) {
        console.log(`Read file error: ${err.message}`)
        return { status: 'error', message: 'Read file error.' }
      }
    }
  
    async getById (id) {
      try {
        if (!id) throw new Error('Missing \'id\' parameter!')
        const readFile = await fs.promises.readFile(this.fileLocation, 'utf-8')
        if (!readFile) throw new Error('The document is empty!')
  
        const data = JSON.parse(readFile).find(e => e.id === id)
        if (!data) throw new Error('Product not found.')
        return { status: 'success', payload: data }
      } catch (err) {
        console.log(`Read file error: ${err.message}`)
        return { status: 'error', message: 'Product not found.' }
      }
    }
  
    async save (product) {
      try {
        if (Object.keys(product).length === 0) throw new Error('Missing or empty \'product\' parameter!')
        const readFile = await fs.promises.readFile(this.fileLocation, 'utf-8')
        let products = []
        let id = 1
  
        if (readFile) {
          products = JSON.parse(readFile)
          const ids = products.map(product => product.id)
          const maxId = Math.max(...ids)
          id = maxId + 1
          const hasProduct = products.find(e => e.title === product.title)
          if (hasProduct) throw new Error('The product already exists with the same name.')
        }
  
        product.id = id
        products = [...products, product]
  
        await fs.promises.writeFile(this.fileLocation, JSON.stringify(products))
        return { status: 'success', payload: product }
      } catch (err) {
        console.log(`Save file error: ${err.message}`)
        return { status: 'error', message: 'Save product error.' }
      }
    }
  
    async updateObject(id, body) {
      try{
          let data = await fs.promises.readFile(this.fileLocation,'utf-8');
          let prods = JSON.parse(data);
          if(!prods.some(p => p.id === id)) return {status: "error", message: "No hay productos con el id especificado"}
          let result = prods.map( prod => {
              if(prod.id === id){
                  if(prod) {
                      body = Object.assign({id: prod.id, ...body});
                      return body;
                  }
                  else {
                      body = Object.assign({id: id, ...body})
                      return body;
                  }
              } else {
                  return prod;
              }
          })
          try {
              await fs.promises.writeFile(this.fileLocation, JSON.stringify(result, null, 2));
              return {status: "success", message: "Producto actualizado"}
          }catch{
              return {status:"error", message:"Error al actualizar el producto"}
          }
      } catch(error) {
          return {status: "error",message: "Fallo al actualizar el producto: " + error}
      }
  }

  
    async deleteById (id) {
      try {
        if (!id) throw new Error('Missing \'id\' parameter!')
        const readFile = await fs.promises.readFile(this.fileLocation, 'utf-8')
        let products = []
  
        if (readFile) products = JSON.parse(readFile)
        const idFound = products.find(e => e.id === id)
        if (!idFound) throw new Error(`ID '${id}' not found in document.`)
        let newProducts = products.filter(e => e.id !== id)
        if (newProducts.length === 0) newProducts = ''
        else newProducts = JSON.stringify(newProducts)
  
        await fs.promises.writeFile(this.fileLocation, newProducts)
        return { status: 'success', message: 'Product deleted successfully.' }
      } catch (err) {
        console.log(`Save file error: ${err.message}`)
        return { status: 'error', message: 'Delete product error.' }
      }
    }
  }
  

export default Contenedor;

/*class Contenedor {

    constructor(fileName) {
        this.fileName = `${appRoot}/files/${fileName}`
    }

    async save({object}) {
            try {
                const content = await fs.promises.readFile(this.fileName, 'utf-8')
                const parsedContent = JSON.parse(content)
                const dataObj = {
                    id: parsedContent.length + 1, title: object.title, price: object.price, thumbnail: object.thumbnail
                }
                if(parsedContent.find(obj => obj.title === object.title) !== undefined) {
                    return {status: "error", message: "El objeto ya existe"}
                } else {
                    const objects = [...parsedContent, dataObj]
                    try {
                        const output = await fs.promises.writeFile(this.fileName, [objects]);
                        return output;
                    } catch(error) {
                        return {status: "error", message: "No se pudo crear el objeto"}
                    }
                }
            } catch (error) {
                try {
                    const output = await fs.promises.writeFile([dataObj])
                    return output;
                } catch(error) {
                    return {status: "error", message: "No se pudo crear el objeto"}
                }
            }
    }

    async writeFile(object) {
        try {
            object = JSON.stringify(object, null, 2);
            await fs.promises.writeFile(this.fileName, object)
            return({status:"success", message: "Objeto creado", object})
        } catch(error) {
            return({status: "error", message: "No se pudo crear el objeto: " + error})
        }
    }

    async updateObject(id, object) {
        try {
            const content = await fs.promises.readFile(this.file, "utf-8")
            const parsedContent = JSON.parse(content)
            const updatedObject = parsedContent.find(obj => obj.id === id)
            if(updatedObject) {
                updatedObject = {
                    ...updatedObject,
                    title: object.title,
                    price: object.price,
                    thumbnail: object.thumbnail
                }
                const products = parsedContent.find(obj => obj.id !== id)
                products = [...products, updatedObject]
                updatedContent = await fs.promises.writeFile(this.file, [products])
                return products
            }
        } catch(error) {
            return {status: "error", message: "No se pudo actualizar el producto"}
        }
    }

    async getById(id) {
        try {
            let data =  await fs.promises.readFile(this.fileName,'utf-8')
            let objects = JSON.parse(data);
            let object = objects.find(obj => obj.id === id);
            if(object) {
                console.log("Get By ID: ", object)
                return {status: "success", object: objects}
            } else {
                return {status: "error", object: null, message: "Objeto no encontrado"}
            }
        } catch(err) {
            return {status: "error", message: "No se encontró el objeto"}
        }
    }

    async getAll() {
        try {
            let data = await fs.promises.readFile(this.fileName, "utf-8")
            let objects = JSON.parse(data)
            if(objects.length > 0) {
                console.log("Get All: ",  objects)
                return objects
            } else {
                return {status: "error", object: null, message: "No hay objetos"}
            }
        } catch(err) {
            return {status: "error", message: "No se encontró el objeto"}
        }
    }

    async deleteById(id) {
        try {
            let data =  await fs.promises.readFile(this.fileName,'utf-8')
            let objects = JSON.parse(data);
            let object = objects.find(obj => obj.id === id)
            if(object) {
                let deleteObject = objects.filter(objects => objects.id !== id)
                objects = [...deleteObject]
                await fs.promises.writeFile(this.fileName, [deleteObject])
                console.log("Delete By ID: ", objects)
                return objects
            } else {
                return {status: "error", object: null, message: "El objeto no se pudo eliminar"}
            }
        } catch(err) {
            return {status: "error", message: "No se encontró el objeto"}
        }
    }

    async deleteAll() {
        try {
            objects = ""
            await fs.promises.writeFile(this.fileName, [objects])
            console.log("Delete All: ", objects)
            return objects
        } catch(err) {
            return {status: "error", message: "No se pudieron eliminar los objetos"}
        }
    }

}

export default Contenedor;*/
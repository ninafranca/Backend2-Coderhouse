const fs = require('fs')
const makeId = require('../utils/utils')
const appRoot = require('app-root-path');

class Contenedor {

    constructor(fileName) {
        this.fileName = `${appRoot}/files/${fileName}`
    }

    save({title, price, thumbnail}) {
        return new Promise(async (resolve, reject) => {
            const dataObj = {
                id: makeId(4), title, price, thumbnail
            }
            try {
                const content = await fs.promises.readFile(this.fileName, 'utf-8')
                const parsedContent = JSON.parse(content)
                if(parsedContent.find(obj => obj.title === title) !== undefined) {
                    return {status: "error", message: "El objeto ya existe"}
                } else {
                    const objects = [...parsedContent, dataObj]
                    try {
                        const output = await this.writeFile(objects);
                        resolve(output);
                    } catch(error) {
                        reject(error)
                    }
                }
            } catch (error) {
                try {
                    const output = await this.writeFile([dataObj])
                    resolve(output);
                } catch(error) {
                    reject(error)
                }
            }
        })
    }

    writeFile(object){
        return new Promise ( async(resolve, reject) => {
            try{
                object = JSON.stringify(object, null, 2);
                await fs.promises.writeFile(this.fileName, object)
                resolve({status:"success",message:"Objeto creado", object})
            } catch(error) {
                reject({status: "error", message: "No se pudo crear el objeto: " + error})
            }
        })
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
            if(objects !== []) {
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
                await fs.promises.writeFile(this.fileName, JSON.stringify([deleteObject], null, 2))
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

module.exports = Contenedor;
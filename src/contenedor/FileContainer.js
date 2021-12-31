const fs = require("fs");
const fileSystem = require("../public/js/config");

class FileContainer {

    constructor(file_endpoint) {
        this.url = `${fileSystem.baseUrl}${file_endpoint}`
    }

    getAll() {
        try {
            const readFile = await fs.promises.readFile(this.url, "utf-8")
            if (!readFile) {
                throw new Error("No hay productos")
            } else {   
                return {status: "success", payload: JSON.parse(readFile)}
            }
        } catch (err) {
            return {status: "error", message: "Error buscando productos"}
        }
    }

    

}

module.exports = FileContainer;
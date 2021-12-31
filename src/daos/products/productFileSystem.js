const FileContainer = require("../../contenedor/FileContainer");

class ProductFileSystem extends FileContainer {

    constructor() {
        super("objects.txt")
    }
}

module.exports = ProductFileSystem;
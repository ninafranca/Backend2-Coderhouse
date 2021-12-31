const FileContainer = require("../../contenedor/FileContainer");

class CartFileSystem extends FileContainer {

    constructor() {
        super("carts.txt")
    }
}

module.exports = CartFileSystem;
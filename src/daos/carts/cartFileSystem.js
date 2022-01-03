import FileContainer from "../../contenedor/FileContainer.js";
import __dirname from "../../utils.js";

class CartFileSystem extends FileContainer {

    constructor() {
        super("carts.txt"),
        this.productsFile = __dirname + ("/files/objects.txt")
    }

}

export default CartFileSystem;
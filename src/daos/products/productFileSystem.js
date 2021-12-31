import FileContainer from "../../contenedor/FileContainer.js";

class ProductFileSystem extends FileContainer {

    constructor() {
        super("objects.txt")
    }
}

export default ProductFileSystem;
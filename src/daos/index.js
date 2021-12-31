let products;
let carts;
let persistance = "fileSystem";

async () => {
    switch(persistance) {
        case "fileSystem":
            const {default: ProductFileSystem} = await require("./products/productFileSystem");
            const {default: CartFileSystem} = await require("./carts/cartFileSystem");
            products = new ProductFileSystem();
            carts = new CartFileSystem();
            break;
        default: 
    }
}

module.exports = {products, carts};
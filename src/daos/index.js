let products;
let carts;
let persistance = "fileSystem";

switch(persistance) {
    case "fileSystem":
        const {default: ProductFileSystem} = await import("./products/productFileSystem.js");
        const {default: CartFileSystem} = await import("./carts/cartFileSystem.js");
        products = new ProductFileSystem();
        carts = new CartFileSystem();
        break;
    default: 
}

export {products, carts};
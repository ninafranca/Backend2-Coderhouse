let products;
let carts;
// persistance según la persistencia que quiera usar (fileSystem, mongo o firebase)
let persistance = "firebase";

switch(persistance) {
    case "fileSystem":
        const {default: ProductFileSystem} = await import("./products/productFileSystem.js");
        const {default: CartFileSystem} = await import("./carts/cartFileSystem.js");
        products = new ProductFileSystem();
        carts = new CartFileSystem();
        break;
    case "mongo":
        const {default: ProductsMongo} = await import("./products/productsMongo.js");
        const {default: CartsMongo} = await import("./carts/cartsMongo.js");
        products = new ProductsMongo();
        carts = new CartsMongo();
    case "firebase":
        const {default: ProductsFB} = await import("./products/productsFB.js");
        const {default: CartsFB} = await import("./carts/cartsFB.js");
        products = new ProductsFB;
        carts = new CartsFB;
    default: 
}

export {products, carts};
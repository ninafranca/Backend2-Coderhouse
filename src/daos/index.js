let products;
let carts;
let chats;
//Cambio el valor de la variable según la persistencia que quiera usar (fileSystem, mongo o firebase):
let persistance = "mongo";

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
        const {default: ChatsMongo} = await import("./chats/chatsMongo.js");
        products = new ProductsMongo();
        carts = new CartsMongo();
        chats = new ChatsMongo();
        break;
    case "firebase":
        const {default: ProductsFB} = await import("./products/productsFB.js");
        const {default: CartsFB} = await import("./carts/cartsFB.js");
        products = new ProductsFB;
        carts = new CartsFB;
        break;
    default: 
}

export {products, carts, chats, persistance};
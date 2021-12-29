const admin = require("firebase-admin");
const serviceAccount = require("../../db/ecommerce-f628b-firebase-adminsdk-h2evm-45e406a98c.json");

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    //"https://BASE.firebaseio.com" <-- en BASE vael nombre de mi coleccion
    databaseURL: "https://ecommerce-f628b.firebaseio.com"
});

CRUD();

async function CRUD() {
    const db = admin.firestore();
    const currentCollection = db.collection("productos");
    try {
        //CREO un registro en la colección//
        //Si dejo vacío el paréntesis, Firebase me crea un ID aleatorio, sino lo pongo en los paréntesis como un string
        let doc = currentCollection.doc();
        //Entre llaves creo el producto con sus propiedades
        //await doc.set({title:"Reglas", description: "Regla de 15 cm", price: 150})
        //Recibo los registros de la colleción con un get//
        const data = await currentCollection.get();
        const productos = data.docs;
        const productosFormatted = productos.map(doc => doc.data())
        console.log(productosFormatted)
    } catch (error) {
        return {status: error, message: error.message}
    }
}
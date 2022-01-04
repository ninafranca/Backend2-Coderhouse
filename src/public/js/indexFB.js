/*import admin from "firebase-admin";
import serviceAccount from "../../db/ecommerce-f628b-firebase-adminsdk-h2evm-45e406a98c.json";

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    //"https://BASE.firebaseio.com" <-- en BASE va el nombre de mi coleccion
    databaseURL: "https://ecommerce-f628b.firebaseio.com"
});

CRUD();

async function CRUD() {
    const db = admin.firestore();
    const currentCollection = db.collection("productos");
    try {
        //CREO UN REGISTRO CON SET()//
        //Si dejo vacío el paréntesis, Firebase me crea un ID aleatorio, sino lo pongo en los paréntesis como un string//
        //let doc = currentCollection.doc();
        //Entre llaves creo el producto con sus propiedades//
        //await doc.set({title:"Mr Burberry", description: "Mr Burberry Parfum by Burberry", price: 85, stock: 23, code: "mr-burberry_burberry", brand: "Burberry", thumbnail: "https://res.cloudinary.com/nanette/image/upload/v1640056868/backend-ecommerce/mr_burberry_-_Burberry_x9q65m.webp"})
        
        //RECIBO TODOS LOS REGISTROS CON GET()//
        //const data = await currentCollection.get();
        //const productos = data.docs;
        //const productosFormatted = productos.map(doc => doc.data())
        //console.log(productosFormatted)

        //RECIBO UN SOLO REGISTRO CON GET(REFERENCIA)//
        //let id = "WKXsTmdhx2KsXeSYJSNT";
        //const doc = currentCollection.doc(id);
        //let product = await doc.get();
        //.data() para que me extraiga los datos de manera más legible//
        //console.log(product.data());

        //ACTUALIZO UN REGISTRO CON UPDATE(REFERENCIA)//Si lo hago con .set() se borran todos los campos que no pasé// 
        //let id = "WKXsTmdhx2KsXeSYJSNT";
        //const doc = currentCollection.doc(id);
        //Solo paso el campo que necesito actualizar//
        //let product = await doc.update({title: "Mr Burberry"});

        //BORRO UN REGISTRO//
        let id = "O5m4YK0EwQ14fdzhmsmi";
        const doc = currentCollection.doc(id);
        await doc.delete();

    } catch (error) {
        return {status: error, message: error.message}
    }
}*/
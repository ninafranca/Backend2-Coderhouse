const express = require('express')
const Contenedor = require('./src/classes/Contenedor')
const productsRouter = require('./src/routes/products')
const app = express();
const cors = require("cors")
const PORT = process.env.PORT || 8080;
const contenedor = new Contenedor();

const server = app.listen(PORT,() => {
    console.log("Listening on port: ", PORT)
})

app.use(express.json())
app.use(cors());
app.use(express.urlencoded({extended:true}))
//app.use(express.static('public'));
app.use('/api/products', productsRouter)
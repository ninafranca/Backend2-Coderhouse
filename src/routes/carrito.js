import express from "express";
import {carts, persistance} from "../daos/index.js";

const router = express.Router();
const fileSystem = "fileSystem";

//GET
// Devuelve todos los productos de un carrito
router.get("/:cart_id/productos", (req, res)=>{
    let cartId = req.params.cart_id;
    carts.getCart(cartId).then(result => {
        res.send(result);
    })
})
// Devuelve el carrito de un usuario
router.get("/:user_id", (req, res) => {
    let userId = req.params.user_id;
    carts.getCartByUserId(userId).then(result => {
        res.send(result);
    })
})

//POST: crea un carrito y devuelve su id
router.post("/:user_id", (req, res) => {
    let userId = req.params.user_id;
    carts.newCart(userId).then(result => {
        res.send(result);
        // if(result.status === "success"){
        //     carts.getAll().then(result => {
        //         console.log(result);
        //     })
        // }
    })
})

// router.post("/:prod_id", (req, res) => {
//     console.log("cart");
//     let userId = req.user.payload._id.toObject();
//     console.log("user id: ", userId);
//     let productId = req.params.prod_id;
//     carts.newCart(userId).then(result => {
//         if (result.status === "error") {
//             carts.getCartByUserId(userId).then(result => {
//                 if (result.status === "success");
//                 let cartId = result;
//                 carts.saveProdById(cartId, productId).then(result => {
//                     res.send(result);
//                 })
//             })
//         }
//         res.send(result);
//     })
// })

//POST: incorpora productos al carrito por su id de producto
router.post("/:id_cart/productos/:id_prod", (req, res) => {
    if(persistance === fileSystem) {
        let prodId = Number(req.params.id_prod);
        let cartId = req.params.id_cart;
        carts.saveProdById(prodId, cartId).then(result => {
            res.send(result);
        })
    } else {
        let prodId = req.params.id_prod;
        let cartId = req.params.id_cart;
        carts.saveProdById(prodId, cartId).then(result => {
            res.send(result);
        })
    }
})

//DELETE: vacía un carrito y lo elimina
router.delete("/:id", (req, res) => {
    let id = req.params.id;
    carts.deleteCartById(id).then(result => {
        res.send(result);
    })
})

//DELETE ID: elimina un producto por su id de producto y de carrito
router.delete("/:id_cart/productos/:id_prod", (req, res) => {
    if(persistance === fileSystem) {
        let prodId = Number(req.params.id_prod);
        let cartId = req.params.id_cart;
        carts.deleteCartProd(cartId, prodId).then(result => {
            res.send(result);
        })
    } else {
        let prodId = req.params.id_prod;
        let cartId = req.params.id_cart;
        carts.deleteCartProd(cartId, prodId).then(result => {
            res.send(result);
        })
    }
})

export default router;
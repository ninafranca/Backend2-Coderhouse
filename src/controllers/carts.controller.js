import {cartsService} from "../services/services.js";

const getCartById = async (req, res) => {
    let cartId = req.params.cart_id;
    await cartsService.getCart(cartId).then(result => {
        res.send(result);
    })
}

const getCartByUserId = async (req, res) => {
    let userId = req.params.user_id;
    await cartsService.getCartByUserId(userId).then(result => {
        res.send(result);
    })
}

const newCart = async (req, res) => {
    let userId = req.params.user_id;
    cartsService.newCart(userId).then(result => {
        res.send(result);
    })
}

const getCartByUserIdAddProd = async (req, res) => {
    let userId = req.params.user_id;
    let prodId = req.params.prod_id;
    cartsService.getCartByUserIdAddProd(userId, prodId).then(result => {
        res.send(result);
    })
}

const saveProductById = async (req, res) => {
    let prodId = req.params.id_prod;
    let cartId = req.params.id_cart;
    cartsService.saveProductById(prodId, cartId).then(result => {
        res.send(result);
    })
}

const deleteCartById = async (req, res) => {
    let id = req.params.id;
    cartsService.deleteCartById(id).then(result => {
        res.send(result);
    })
}

const deleteOneCartProd = async (req, res) => {
    let prodId = req.params.id_prod;
    let cartId = req.params.id_cart;
    cartsService.deleteOneCartProd(cartId, prodId).then(result => {
        res.send(result);
    })
}

const deleteCartProd = async (req, res) => {
    let prodId = req.params.id_prod;
    let cartId = req.params.id_cart;
    cartsService.deleteCartProd(cartId, prodId).then(result => {
        res.send(result);
    })
}

export default {
    getCartById,
    getCartByUserId,
    newCart,
    getCartByUserIdAddProd,
    saveProductById,
    deleteCartById,
    deleteOneCartProd,
    deleteCartProd
}
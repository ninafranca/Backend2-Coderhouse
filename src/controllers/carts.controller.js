import {cartsService} from "../services/services.js";

const getCartById = async (req, res) => {
    let cartId = req.params.cart_id;
    await cartsService.getCart(cartId).then(result => {
        res.send(result);
    })
}
// const getCartById = async(req,res) =>{
//     let id = req.params.cid;
//     let cart = await cartService.getByWithPopulate({_id:id})
//     console.log(cart);
//     res.send({status:200,payload:cart})
// }

export default {
    getCartById
}
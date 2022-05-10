import {ordersService, cartsService} from "../services/services.js";

const setOrder = async (req, res) => {
    let cartId = req.params.cart_id;
    let userId = req.params.user_id;
    cartsService.getCart(cartId).then(result => {
        let products = result.payload.products;
        console.log(products);
        ordersService.setOrder(products, userId).then(async result => {
            await cartsService.deleteCartById(cartId).then(result => {
                res.send(result);
            });
            res.send(result);
        })
    })
}

export default {
    setOrder
}
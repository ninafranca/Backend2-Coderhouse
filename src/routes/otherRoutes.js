import express from "express";

const router = express.Router();

router.get("/chat", passportCall("jwt"), (req, res) => {
    let user = req.user.payload.toObject();
    let role = req.user.payload.toObject().role.toUpperCase();
    if(role === "ADMIN") {
        res.render("ChatAdmin", {user});
    } else {
        res.render("Chat", {user});
    }
})
router.get("/add-products-admin", passportCall("jwt"), (req, res) => {
    let user = req.user.payload.toObject();
    res.render("AddProductsAdmin", {user});
})
router.get("/admin-info", passportCall("jwt"), (req, res) => {
    let user = req.user.payload.toObject();
    res.render("AdminInfo", {user});
})
router.get("/user-info", passportCall("jwt"), (req, res) => {
    let user = req.user.payload.toObject();
    res.render("User", {user});
})
router.get("/info", (req, res) => {
    let info = {
        arguments: process.argv,
        cwd: cwd(),
        pid: pid,
        version: version,
        title: title,
        platform: platform,
        memory: memoryUsage()
    }
    logger.info(info);
    res.send(info);
});

//HANDLEBARS
router.get("/productos", passportCall("jwt"), (req, res) => {
    let user = req.user.payload.toObject();
    products.getAll().then(result => {
        const products = result.payload;
        const objects = {products: products.map(prod => prod.toObject()), user: user};
        if (result.status === "success") {
            res.render("Home", objects)
        } else {res.status(500).send(result)}
    })
})
router.get("/productos/:category", passportCall("jwt"), (req, res) => {
    let cat = req.params.category;
    let user = req.user.payload.toObject();
    products.getByCategory(cat).then(result => {
        const products = result.payload;
        const objects = {products: products.map(prod => prod.toObject()), user: user};
        if (result.status === "success") {
            res.render("Category", objects);
        } else {res.status(500).send(result)}
    })
})
router.get("/carrito/:id_user", passportCall("jwt"), (req, res) => {
    let id = req.params.id_user;
    let user = req.user.payload.toObject();
    if (req.user.status !== "success") {
        location.replace("/login")
    } else {
        carts.getCartByUserId(id).then(result => {
            if(result.status === "success") {
                const productsId = result.payload.products;
                console.log(productsId);
                const cartId = result.payload._id;
                console.log("cartId ", cartId);
                let list = []
                productsId.map(p => products.getById(p).then(result => {
                    if (result.status === "success") {
                        list.push(result.payload.toObject())
                    }
                }))
                setTimeout(() => {
                    let total = list.reduce((a, b) => {
                        return {price: a.price + b.price};
                    })
                    let repeatedProds = [...list.reduce( (mp, o) => {
                        if (!mp.has(o.title)) mp.set(o.title, { ...o, count: 0 });
                        mp.get(o.title).count++;
                        return mp;
                    }, new Map).values()];
                    const objects = {products: repeatedProds, user: user, cart: cartId, total: total};
                    if (result.status === "success") {
                        res.render("Cart", objects);
                    } else {
                        res.status(500).send(result);
                        return;
                    }
                }, 500)
            } else {
                const objects = {user};
                res.render("Cart", objects);
                return
            }
        })
    }
})
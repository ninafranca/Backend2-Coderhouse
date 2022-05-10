import __dirname from "./utils.js";
import express from "express";
import {chatsService, productsService, cartsService} from "./services/services.js";
// import {chats, products, cartsService} from "./daos/index.js";
import productsRouter from "./routes/products.js";
import cartsRouter from "./routes/carts.js";
import chatsRouter from "./routes/chats.js";
import sessionsRouter from "./routes/sessions.js"
import usersRouter from "./routes/users.js";
import ordersRouter from "./routes/orders.js";
import {Server} from "socket.io";
import {engine} from "express-handlebars";
import cors from "cors";
import session from "express-session";
import MongoStore from "connect-mongo";
import createLogger from "./public/js/logger.js";
//import {cwd, pid, version, title, platform, memoryUsage} from "process";
import passport from "passport";
import initializePassport from "./config/passport.js";
import upload from "./services/upload.js";
import {passportCall} from "./middlewares/middlewares.js";
import jwt from "jsonwebtoken";
import cookieParser from "cookie-parser";
import {envConfig} from "./config/envConfig.js";

const app = express();
const PORT = parseInt(process.env.PORT) || 8080;
const server = app.listen(PORT,() => {
    console.log("Listening on port: ", PORT)
});
const io = new Server(server);
const logger = createLogger(envConfig.NODE_ENV);

//APP.USE
app.use(express.json());
app.use(cors());
app.use(express.urlencoded({extended:true}));
app.use((req, res, next) => {
    req.io = io;
    next();
})
app.use("/api/productos", productsRouter);
app.use("/api/carrito", cartsRouter);
app.use("/api/chats", chatsRouter);
app.use("/session", sessionsRouter);
app.use("/users", usersRouter);
app.use("/orders", ordersRouter);
app.use(express.static(__dirname + "/public"));
app.use(session({
    store: MongoStore.create({mongoUrl: envConfig.MONGO_SESSIONS}),
    secret: envConfig.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {maxAge: 1000}
}))
initializePassport();
app.use(passport.initialize());
app.use(passport.session());
app.use(cookieParser())

//APP.ENGINE
//Para Handlebars
app.engine("handlebars", engine());

//APP.SET
app.set("views", __dirname + "/views");
//Para Handlebars
app.set("view engine", "handlebars");

app.get("/", (req, res) => {
    res.sendFile("login.html", {root: __dirname + "/public/pages"});
})
app.get("/chat", passportCall("jwt"), (req, res) => {
    let user = req.user.payload.toObject();
    let role = req.user.payload.toObject().role.toUpperCase();
    if(role === "ADMIN") {
        res.render("ChatAdmin", {user});
    } else {
        res.render("Chat", {user});
    }
})
app.get("/add-products-admin", passportCall("jwt"), (req, res) => {
    let user = req.user.payload.toObject();
    res.render("AddProductsAdmin", {user});
})
app.get("/admin-info", passportCall("jwt"), (req, res) => {
    let user = req.user.payload.toObject();
    res.render("AdminInfo", {user});
})
app.get("/user-info", passportCall("jwt"), (req, res) => {
    let user = req.user.payload.toObject();
    res.render("User", {user});
})
app.get("/logged", passportCall("jwt"), (req, res) => {
    let user = req.user.payload.toObject();
    let role = req.user.payload.toObject().role.toUpperCase();
    console.log(role);
    if(role === "ADMIN") {
        console.log("logged: ", user);
        res.render("LoggedAdmin", {user});
    } else {
        console.log("logged: ", user);
        res.render("Logged", {user});
    }
})
//HANDLEBARS
app.get("/productos", passportCall("jwt"), (req, res) => {
    let user = req.user.payload.toObject();
    productsService.getAll().then(result => {
        const products = result;
        const objects = {products: products, user: user};
        res.render("Home", objects)
    })
})
// app.get("/productos", passportCall("jwt"), (req, res) => {
//     let user = req.user.payload.toObject();
//     productsService.getAll().then(result => {
//         const products = result.payload;
//         console.log(result);
//         const objects = {products: products.map(prod => prod.toObject()), user: user};
//         if (result.status === "success") {
//             res.render("Home", objects)
//         } else {res.status(500).send(result)}
//     })
// })

app.get("/productos/:category", passportCall("jwt"), (req, res) => {
    let cat = req.params.category;
    let user = req.user.payload.toObject();
    productsService.getByCategory(cat).then(result => {
        const products = result.payload;
        const objects = {products: products.map(prod => prod.toObject()), user: user};
        if (result.status === "success") {
            res.render("Category", objects);
        } else {res.status(500).send(result)}
    })
})
app.get("/carrito/:id_user", passportCall("jwt"), (req, res) => {
    let id = req.params.id_user;
    let user = req.user.payload.toObject();
    if (req.user.status !== "success") {
        location.replace("/login")
    } else {
        cartsService.getCartByUserId(id).then(result => {
            if(result.status === "success") {
                const productsId = result.payload.products;
                console.log(productsId);
                const cartId = result.payload._id;
                console.log("cartId ", cartId);
                let list = []
                productsId.map(p => productsService.getById(p).then(result => {
                    if (result.status === "success") {
                        list.push(result.payload.toObject())
                    }
                }))
                setTimeout(() => {
                    if(list.length > 0) {
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
                    } else {
                        const objects = {user};
                        res.render("Cart", objects);
                        return
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

// app.post("/api/productos", (req, res) => {
//     let prod = req.body;
//     productsService.save(prod).then(result => {
//         res.send(result);
//         if(result.status === "success"){
//             console.log(0);
//             productsService.getAll().then(result => {
//                 console.log(1);
//                 console.log("result: ", result);
//                 console.log(2);
//                 req.io.emit("deliverProducts", result);
//             })
//         }
//     })
// })

let messages = [];
io.on("connection", async socket => {
    console.log("Se conectó socket " + socket.id);
    let prods = await productsService.getAll();
    socket.emit("deliverProducts", prods);
    socket.emit("messagelog", messages);
    socket.on("message", data => {
        chatsService.saveMessage(data)
        .then(result => console.log(result))
        .then(() => {
            chatsService.getAllMessages().then(result => {
            if (result.status === "success") {
                io.emit("message", result.payload)
            }
            })
        })
        messages.push(data);
        io.emit("messagelog", messages)
    })
})

app.use((req, res) => {
    logger.warn(`Método ${req.method} no disponible en ruta ${req.path}`);
    res.status(404).send({error: -2, message: "Ruta no implementada"});
})
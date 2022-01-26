/*import express from "express";
import session from "express-session";
import MongoStore from "connect-mongo";
import {users} from "../daos/index.js";

const router = express.Router();
const baseSession = (session({
    store: MongoStore.create({mongoUrl: "mongodb+srv://Nina:123@ecommerce.b23tg.mongodb.net/sessions?retryWrites=true&w=majority"}),
    secret: "Coder",
    resave: false,
    saveUninitialized: false,
}))

router.use(baseSession);

//GET
router.get("/", (req, res) => {
    users.getUsers().then(result => {
        res.send(result);
    })
})

//POST
router.post("/", async (req, res) => {
    console.log("Soy login route");
    let name = req.body;
    if(!name) {
        return res.satus(400).send({error: "Completa el nombre"})
    }
    const user = await users.getByName(name);
    req.session.user = {
        name: user.name
    }
    res.send({status:"logged"})
})

export default router;*/
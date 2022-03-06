import passport from "passport";
import local from "passport-local";
import {validPassword, hashPassword} from "../../utils.js";
import {users} from "../../daos/index.js";

const localStrategy = local.Strategy
const initializePassport = () => {

    passport.use("register", new localStrategy({
        passReqToCallback: true, 
        usernameField: "email"
    }, async (req, username, password, done) => {
        console.log("passport0");
        let {email, name, address, age, phone} = req.body;
        try {
            console.log("passport");
            let user = await users.findOne({email: username});
            if(user) return done(null, false, {message: "El usuario ya existe"});
            const newUser = {
                email,
                name,
                password: hashPassword(password),
                address,
                age,
                phone,
                avatar: req.file.filename,
                carts: []
            }
            try {
                let result = await users.create(newUser);
                done(null, result)
            } catch(error) {
                return done(error)
            }
        } catch(error) {
            return done(error)
        }
    }))

    passport.use("login", new localStrategy(async (username, password, done) => {
        try {
            let user = await users.findOne({id: username});
            if(!user) return done(null, false, {message: "Usuario no encontrado"});
            if(!validPassword(user, password)) return done(null, false, {message: "Contraseña inválida"});
            return done(null, user)
        } catch(error) {
            done(error)
        }
    }))

    passport.serializeUser((user, done) => {
        done(null, users._id)
    })

    passport.deserializeUser((id, done)=> {
        users.findById(id, done)
    })

}

export default initializePassport;
import passport from "passport";
import local from "passport-local";
import {validPassword, hashPassword} from "../../utils.js";
import {users} from "../../daos/index.js";

const localStrategy = local.Strategy
const initializePassport = () => {

    passport.use("register", new localStrategy({
        passReqToCallback: true
    }, async (req, email, password, done) => {
        console.log("passport0");
        try {
            console.log("passport");
            let user = await users.findOne({email: email});
            if(user) return done(null, false, {message: "El usuario ya existe"});
            const newUser = {
                email: email,
                name: req.body.name,
                password: hashPassword(password),
                address: req.body.address,
                age: req.body.age,
                phone: req.body.phone,
                avatar: "no disponible"
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
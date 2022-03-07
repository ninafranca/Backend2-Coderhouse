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
        let {email, name, address, age, phone} = req.body;
        try {
            console.log("passport");
            //if(!req.file) return done(null, false, {messages: "No se pudo subir la imágen"});
            //let user = await users.getByEmail(username);
            console.log(1);
            //if(user) return done(null, false, {message: "El usuario ya existe"});
            console.log(2);
            const newUser = {
                email,
                name,
                password: hashPassword(password),
                address,
                age,
                phone,
                avatar: "NA",
                carts: []
            }
            try {
                console.log(3);
                let result = await users.saveUser(newUser);
                console.log(result);
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
        done(null, user._id)
    })

    passport.deserializeUser(async (id, done) => {
        let result = await users.findById(id);
        done(null, result)
    })

}

export default initializePassport;
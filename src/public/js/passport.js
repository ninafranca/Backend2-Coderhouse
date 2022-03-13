import passport from "passport";
import local from "passport-local";
import {validPassword, hashPassword, cookieExtractor} from "../../utils.js";
import {users} from "../../daos/index.js";
import jwt from "passport-jwt";
import {envConfig} from "./envConfig.js";

const localStrategy = local.Strategy
const JWTStrategy = jwt.Strategy;
const extractJwt = jwt.ExtractJwt;

const initializePassport = () => {

    passport.use("register", new localStrategy({
        passReqToCallback: true, 
        usernameField: "email"
    }, async (req, username, password, done) => {
        let {email, name, address, age, phone} = req.body;
        try {
            //if(!req.file) return done(null, false, {messages: "No se pudo subir la imágen"});
            console.log("req.file", req.file);
            //const filename = await req.file;
            let user = await users.getByEmail(username);
            console.log(user);
            // console.log("user ", user);
            // console.log(username);
            if(user.status === "success") {
                console.log(1);
                return done("error");
            } else {
                console.log(3);
                const newUser = {
                    email,
                    name,
                    password: hashPassword(password),
                    address,
                    age,
                    phone,
                    //avatar: filename,
                    avatar: "NA",
                    carts: []
                }
                console.log(newUser);
                let result = await users.saveUser(newUser);
                if(result) {
                    console.log("result " + JSON.stringify(result));
                    done(null, result);
                } else {
                    return {status: "error", message: "Ya existe mismo usuario"}
                }
            }
        } catch(error) {
            return done(error)
        }
    }))

    passport.use("login", new localStrategy(({usernameField: "email"}), async (username, password, done) => {
        try {
            console.log(username);
            console.log(password);
            let user = await users.getByEmail(username);
            console.log("usuario: " + JSON.stringify(user));
            if(!user) return done(null, false, {message: "Usuario no encontrado"});
            //if(!validPassword(user, password)) return done(null, false, {message: "Contraseña inválida"});
            return done(null, user)
        } catch(error) {
            done(error)
        }
    }))

    passport.use("jwt", new JWTStrategy({jwtFromRequest: extractJwt.fromExtractors([cookieExtractor]), secretOrKey: envConfig.JWT_SECRET }, async (jwt_payload, done) => {
        try {
            if(jwt_payload.role === "admin") return done(null, jwt_payload);
            console.log(payload);
            let user = await users.getById(jwt_payload._id);
            if(!user) return done(null, false, {message: "Usuario no encontrado"});
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
import passport from "passport";
import local from "passport-local";
import {validPassword, hashPassword, cookieExtractor} from "../utils.js";
import {usersService} from "../services/services.js";
import jwt from "passport-jwt";
import {envConfig} from "./envConfig.js";
import createLogger from "../public/js/logger.js";
//PONER LOGGERS DE ERROR!//

const logger = createLogger(envConfig.NODE_ENV);
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
                let user = await usersService.getByEmail(username);
                if(user.status === "success") {
                    return done("Usuario ya registrado");
                } else {
                    const newUser = {
                        email,
                        name,
                        password: hashPassword(password),
                        address,
                        age,
                        phone,
                        avatar: req.file.filename,
                        role: "user"
                    }
                    let result = await usersService.saveUser(newUser);
                    if(result) {
                        done(null, result);
                    } else {
                        logger.error("Usuario ya existente");
                        return {status: "error", message: "Ya existe mismo usuario"}
                    }
                }
            } catch(error) {
                logger.error("Error registrando usuario");
                return done(error)
            }
        }
    ))

    passport.use("login", new localStrategy(({usernameField: "email"}), async (username, password, done) => {
        try {
            let user = await usersService.getByEmail(username);
            if(!user) return done(null, false, {message: "Usuario no encontrado"});
            let userPass = user.payload.password;
            if(validPassword(password, userPass) === false) return done(null, false, {status: "error", message: "Contraseña inválida"});
            return done(null, user)
        } catch(error) {
            logger.error("Error en login de usuario");
            return done(error)
        }
    }))

    passport.use("jwt", new JWTStrategy({jwtFromRequest: extractJwt.fromExtractors([cookieExtractor]), secretOrKey: envConfig.JWT_SECRET}, async (jwt_payload, done) => {
        try {
            let user = await usersService.getByEmail(jwt_payload.payload.email);
            if(!user) return done(null, false, {message: "Usuario no encontrado"});
            return done(null, user);
        } catch(error) {
            logger.error("Error de autenticación de usuario");
            return done(error);
        }
    }))

    passport.serializeUser((user, done) => {
        done(null, user._id)
    })

    passport.deserializeUser(async (id, done) => {
        usersService.findById(id, done)
    })

}

export default initializePassport;
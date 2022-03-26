import passport from "passport";

export const passportCall = (strategy) => {
    return async (req, res, next) => {
        passport.authenticate(strategy, function (err, user, info) {
            if(err) return next(err);
            if(!user) return res.send({error: info.messages ? info.messages : info.toString()});
            req.user =  user;
            next();
        }) (req, res, next)
    }
}

export const checkAuth = (roles) => {
    return async (req, res, next) => {
        console.log("req.user: ", req.user);
        if(!req.user) return res.send({message: "No autorizado"});
        if(roles.includes(req.user.payload.role.toUpperCase())) next();
        else res.status(403).send({error: "Usuario no permitido en la ruta"})
    }
}
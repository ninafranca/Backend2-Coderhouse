import passport from "passport";
import fbStrategy from "passport-facebook";
import {users} from "../../daos/index.js";
import config from "./envConfig.js";

const facebookStrategy = fbStrategy.Strategy;
const initializePassportConfig = () => {

    passport.use("facebook", new facebookStrategy({
        clientID: 617219482683854,
        clientSecret: config.FACEBOOK_SECRET,
        callbackURL: config.NGROK_CALLBACK,
        profileFields: ["emails", "displayName", "photos"]
    }, async (accessToken, refreshToken, profile, done) => {
        try {
            console.log(accessToken);
            console.log(profile);
            let user = await users.findOne({email: profile.emails[0].value});
            let fbProfile = {
                displayName: profile.displayName,
                email: profile.emails[0].value,
                picture: profile.photos[0]
            }
            done(null, user, fbProfile);
        } catch(error) {
            done(error);
        }
    }));

    passport.serializeUser((user, done) => {
        done(null, user._id)
    });

    passport.deserializeUser((id, done) => {
        users.findById(id, done)
    });
}

export default initializePassportConfig;
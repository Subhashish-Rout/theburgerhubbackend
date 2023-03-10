import { Strategy as GoogleStratergy } from "passport-google-oauth20";
import { User } from "../models/User.js"
import passport from "passport";

export const connectPassport = () => {
  passport.use(
    new GoogleStratergy(
      {
        clientID: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        callbackURL: process.env.GOOGLE_CALLBACK_URL,
      },
      async function (accessToken, refreshtoken, profile, done) {
        //Databse comes here
        const user = await User.findOne({
            googleId : profile.id,
        });
        if(!user){
            const newUser = await User.create({
                googleId: profile.id,   
                name: profile.displayName,
                photo : profile.photos[0].value,
            })
            return done(null,newUser);
        }else{
            return done(null,user);
        }
      }
    )
  );
  passport.serializeUser((user, done) => {
    done(null, user.id);
  });
  passport.deserializeUser(async (id, done) => {
    const user = await User.findById(id);
    done(null, user);
  });
};
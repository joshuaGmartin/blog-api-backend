import passport from "passport";
import { Strategy as LocalStrategy } from "passport-local";
import { validatePassword } from "../lib/passwordUtil.js";
import * as user from "../models/user.js";

async function verifyCallback(username, password, done) {
  try {
    const userMatch = await user.findByUsername(username);

    if (!userMatch)
      return done(null, false, { message: "Username does not exist" });

    const isValid = await validatePassword(password, userMatch.password);
    if (!isValid) return done(null, false, { message: "Incorrect password" });

    return done(null, userMatch);
  } catch (err) {
    return done(err);
  }
}

const strategy = new LocalStrategy(verifyCallback);

//init
passport.use(strategy);

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (userID, done) => {
  try {
    const userMatch = await user.findByUserID(userID);

    done(null, userMatch);
  } catch (err) {
    done(err);
  }
});

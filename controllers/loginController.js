import { body, validationResult } from "express-validator";
import passport from "passport";
import jwt from "jsonwebtoken";

const validateUser = [
  body("username").trim().notEmpty().withMessage("Must include username"),
  body("password").trim().notEmpty().withMessage("Must include password"),
];

export function getLogin(req, res) {
  res.render("login");
}

const auth = (req, res, next) =>
  passport.authenticate("local", (err, user, info) => {
    if (err) return next(err);

    if (!user) {
      const values = req.body;
      const errors = { msg: info.message }; // convert authentication failure to error display

      return res.status(401).json({
        errors: [errors],
        values: values,
      });
    }

    jwt.sign({ user }, "secretkey", { expiresIn: "1d" }, (err, token) => {
      if (err) return next(err);

      res.json({ token, user });
    });
  })(req, res, next); // passport.authenticate returns a function that needs to be called with wrapper function's (auth()) parameters

export const postLogin = [
  validateUser,
  (req, res, next) => {
    // or
    // function (req, res, next) {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      const values = req.body;

      return res.render("login", {
        errors: errors.array(),
        values: values,
      });
    }

    next();
  },
  auth,
];

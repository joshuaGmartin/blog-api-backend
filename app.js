import express from "express";
import "dotenv/config";

// ==========================================================================
// app
// ==========================================================================
import path from "node:path";
import { fileURLToPath } from "node:url";
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");
app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded({ extended: true }));

// ==========================================================================
// session
// ==========================================================================
// import expressSession from "express-session";
// import { PrismaPg } from "@prisma/adapter-pg"; // For other db adapters, see Prisma docs
// import { PrismaClient } from "./generated/prisma/client.js";
// import { PrismaSessionStore } from "@quixo3/prisma-session-store";

// const connectionString = `${process.env.DATABASE_URL}`;
// const adapter = new PrismaPg({ connectionString });
// const prisma = new PrismaClient({ adapter });

// app.use(
//   expressSession({
//     cookie: {
//       maxAge: 7 * 24 * 60 * 60 * 1000, // 1 week in ms
//     },
//     secret: process.env.COOKIE_SECRET,
//     resave: true,
//     saveUninitialized: true,
//     store: new PrismaSessionStore(prisma, {
//       checkPeriod: 2 * 60 * 1000, //ms
//       dbRecordIdIsSessionId: true,
//       dbRecordIdFunction: undefined,
//     }),
//   }),
// );

// ==========================================================================
// authentication
// ==========================================================================
import passport from "passport";
import "./config/passport.js";
// app.use(passport.session());

// ==========================================================================
// variables/middleware
// ==========================================================================
//globals
app.use((req, res, next) => {
  res.locals.appTitle = "appTitleGoesHere";
  // res.locals.isAuth = req.isAuthenticated();
  res.locals.isAuth = false;
  // in .ejs, check locals.isAuth first to avoid crash on locals.user check
  res.locals.user = req.user;
  next();
});

//debug
// app.use((req, res, next) => {
//   // console.log(res.locals);
//   console.log(req.body);
//   next();
// });

// ==========================================================================
// routes
// ==========================================================================

//test>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
import jwt from "jsonwebtoken";

app.get("/api", (req, res) => {
  res.json({ message: "Welcome to the API" });
});

app.post("/api/posts", verifyToken, (req, res) => {
  jwt.verify(req.token, "secretkey", (err, authData) => {
    if (err) {
      res.sendStatus(403);
    } else {
      res.json({ message: "post created", authData });
    }
  });
});

app.post("/api/login", (req, res) => {
  //mock user (should auth here)
  const user = { id: 1, username: "brad", email: "brad@gmail.com" };

  jwt.sign({ user }, "secretkey", { expiresIn: "30s" }, (err, token) => {
    res.json({ token });
  });
});

function verifyToken(req, res, next) {
  //get auth header
  const bearerHeader = req.headers["authorization"];
  // if (typeof bearerHeader !== "undefined") {
  if (!bearerHeader) {
    res.sendStatus(403);
  } else {
    const bearer = bearerHeader.split(" ");
    const bearerToken = bearer[1];
    req.token = bearerToken;
    next();
  }
}
//test>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>

import router from "./routes/index.js";
import { type } from "node:os";

app.use(router);

// ==========================================================================
// 404/errors
// ==========================================================================
app.use((req, res) => res.send("404: Page not found"));

app.use((err, req, res, next) => {
  console.log(err);
  res.status(err.statusCode || 500).send(err.message);
});

// ==========================================================================
// server
// ==========================================================================
const PORT = 3000;

app.listen(PORT, (err) => {
  if (err) throw err;

  console.log("Listening on port:", PORT);
});

// ==========================================================================
// testing
// ==========================================================================

import { Router } from "express";
const router = Router();
import * as middleware from "../middleware/middleware.js";
import registerRouter from "./registerRouter.js";
import loginRouter from "./loginRouter.js";
import logoutRouter from "./logoutRouter.js";
import homeRouter from "./homeRouter.js";

router.get("/", middleware.isNoAuthCheck, (req, res) => res.render("index"));

router.use("/register", middleware.isNoAuthCheck, registerRouter);
router.use("/login", middleware.isNoAuthCheck, loginRouter);
router.use("/logout", middleware.isAuthCheck, logoutRouter);
router.use("/home", middleware.isAuthCheck, homeRouter);

export default router;

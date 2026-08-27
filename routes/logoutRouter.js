import { Router } from "express";
const logoutRouter = Router();
import * as logoutController from "../controllers/logoutController.js";

logoutRouter.post("/", logoutController.postLogout);

export default logoutRouter;

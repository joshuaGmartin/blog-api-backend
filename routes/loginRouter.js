import { Router } from "express";
const loginRouter = Router();
import * as loginController from "../controllers/loginController.js";

loginRouter.get("/", loginController.getLogin);
loginRouter.post("/", loginController.postLogin);

export default loginRouter;

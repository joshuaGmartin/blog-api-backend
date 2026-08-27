import { Router } from "express";
const registerRouter = Router();
import * as registerController from "../controllers/registerController.js";

registerRouter.get("/", registerController.getRegister);
registerRouter.post("/", registerController.postRegister);

export default registerRouter;

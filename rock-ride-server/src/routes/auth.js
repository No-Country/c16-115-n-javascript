

import { Router } from "express";

import { registerHandler } from "../handlers/regiter.handler.js";

const authRouter = Router();


authRouter.post("/register", registerHandler)

export default authRouter;
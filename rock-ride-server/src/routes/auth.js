

import { Router } from "express";
import {  loginHandler, registerHandler } from "../handlers/auth.handler.js";



const authRouter = Router();


authRouter.post("/register", registerHandler)

authRouter.post("/login", loginHandler)

export default authRouter;
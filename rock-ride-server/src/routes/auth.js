

import { Router } from "express";
import {  forgotPasswordHandler, loginHandler, registerHandler, resetPasswordHandler, verifyEmailHandler } from "../handlers/auth.handler.js";



const authRouter = Router();


authRouter.post("/register", registerHandler)
authRouter.get("/confirm-account/:token", verifyEmailHandler)
authRouter.post("/login", loginHandler)
authRouter.put('/forgot-password', forgotPasswordHandler)
authRouter.put('/reset-password', resetPasswordHandler)

export default authRouter;
import { Router } from "express";
import { verifyToken } from "../middlewares/auth-middleware.js";
import { postBookingHandler } from "../handlers/bookings.handler.js";


const bookingRouter = Router();

bookingRouter.post("/create", verifyToken, postBookingHandler);

export default bookingRouter;
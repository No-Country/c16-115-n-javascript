import { Router } from "express";
import { verifyToken } from "../middlewares/auth-middleware.js";
import { getBookingsHandler, postBookingHandler } from "../handlers/bookings.handler.js";


const bookingRouter = Router();

bookingRouter.post("/create", verifyToken, postBookingHandler);
bookingRouter.get("/", getBookingsHandler);

export default bookingRouter;
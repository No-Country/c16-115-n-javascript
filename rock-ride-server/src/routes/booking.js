import { Router } from "express";
import { verifyToken } from "../middlewares/auth-middleware.js";
import { getBookingByIdHandler, getBookingsHandler, postBookingHandler } from "../handlers/bookings.handler.js";


const bookingRouter = Router();

bookingRouter.post("/create", verifyToken, postBookingHandler);
bookingRouter.get("/", getBookingsHandler);
bookingRouter.get("/:id", getBookingByIdHandler);

export default bookingRouter;
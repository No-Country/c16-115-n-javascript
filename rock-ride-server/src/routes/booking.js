import { Router } from "express";
import { verifyToken } from "../middlewares/auth-middleware.js";
import { getBookingByIdHandler, getBookingsHandler, postBookingHandler, putBookingHandler } from "../handlers/bookings.handler.js";


const bookingRouter = Router();

bookingRouter.post("/create", verifyToken, postBookingHandler);
bookingRouter.get("/", getBookingsHandler);
bookingRouter.get("/:id", getBookingByIdHandler);
bookingRouter.put("/update/:id", verifyToken, putBookingHandler);

export default bookingRouter;
import { Router } from "express";
import { deleteTripHandler, getTripByIdHandler, getTripsHandler, postTripHandler, putTripHandler } from "../handlers/trips.handler.js";
import { verifyToken } from "../middlewares/auth-middleware.js";

const tripRouter = Router();

tripRouter.post("/create", verifyToken, postTripHandler);
tripRouter.get("/", getTripsHandler);
tripRouter.get("/:id", getTripByIdHandler);
tripRouter.put("/update/:id", verifyToken, putTripHandler);
tripRouter.delete("/delete/:id", verifyToken,  deleteTripHandler);

export default tripRouter;
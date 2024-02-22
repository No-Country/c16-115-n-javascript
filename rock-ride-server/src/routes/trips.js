import { Router } from "express";
import { deleteTripHandler, getTripByIdHandler, getTripsHandler, postTripHandler, putTripHandler } from "../handlers/trips.handler.js";

const tripRouter = Router();

tripRouter.post("/create", postTripHandler);
tripRouter.get("/", getTripsHandler);
tripRouter.get("/:id", getTripByIdHandler);
tripRouter.put("/update/:id", putTripHandler);
tripRouter.delete("/delete/:id", deleteTripHandler);

export default tripRouter;
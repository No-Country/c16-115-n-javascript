import { Router } from "express";
import { getTripByIdHandler, getTripsHandler, postTripHandler } from "../handlers/trips.handler.js";

const tripRouter = Router();

tripRouter.post("/create", postTripHandler);
tripRouter.get("/", getTripsHandler);
tripRouter.get("/:id", getTripByIdHandler);

export default tripRouter;
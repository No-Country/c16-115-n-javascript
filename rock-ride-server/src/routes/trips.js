import { Router } from "express";
import { getTripsHandler, postTripHandler } from "../handlers/trips.handler.js";

const tripRouter = Router();

tripRouter.post("/create", postTripHandler);
tripRouter.get("/", getTripsHandler);


export default tripRouter;
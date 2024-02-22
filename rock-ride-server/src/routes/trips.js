import { Router } from "express";
import { postTripHandler } from "../handlers/trips.handler.js";

const tripRouter = Router();

tripRouter.post("/create", postTripHandler);


export default tripRouter;
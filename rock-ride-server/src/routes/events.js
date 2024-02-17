import { Router } from "express";
import { getEventsHandler } from "../handlers/events.handler.js";


const eventRouter = Router();
eventRouter.get("/", getEventsHandler);

export default eventRouter;
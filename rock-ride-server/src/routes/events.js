import { Router } from "express";
import { getEventByIdHandler, getEventsHandler } from "../handlers/events.handler.js";


const eventRouter = Router();
eventRouter.get("/", getEventsHandler);
eventRouter.get("/:id", getEventByIdHandler);

export default eventRouter;
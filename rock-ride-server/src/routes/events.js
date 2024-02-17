import { Router } from "express";
import { getEventByIdHandler, getEventByNameHandler, getEventsHandler } from "../handlers/events.handler.js";


const eventRouter = Router();
eventRouter.get("/", getEventsHandler);
eventRouter.get("/:id", getEventByIdHandler);
eventRouter.get("/name/:name", getEventByNameHandler);

export default eventRouter;
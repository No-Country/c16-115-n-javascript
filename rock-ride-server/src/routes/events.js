import { Router } from "express";
import { deleteEventHandler, getEventByIdHandler, getEventByNameHandler, getEventsHandler, postEventHandler, putEventHandler } from "../handlers/events.handler.js";


const eventRouter = Router();
eventRouter.get("/", getEventsHandler);
eventRouter.get("/:id", getEventByIdHandler);
eventRouter.get("/name/:name", getEventByNameHandler);
eventRouter.post("/create",postEventHandler);
eventRouter.put("/update/:id",putEventHandler);
eventRouter.delete("/delete/:id", deleteEventHandler);

export default eventRouter;
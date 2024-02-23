import { Router } from "express";
import {
  deleteEventHandler,
  getEventByIdHandler,
  getEventsHandler,
  postEventHandler,
  putEventHandler,
} from "../handlers/events.handler.js";
import { verifyToken } from "../middlewares/auth-middleware.js";

const eventRouter = Router();
eventRouter.get("/", getEventsHandler);
eventRouter.get("/:id", getEventByIdHandler);
eventRouter.post("/create", verifyToken, postEventHandler);
eventRouter.put("/update/:id", verifyToken, putEventHandler);
eventRouter.delete("/delete/:id", verifyToken, deleteEventHandler);

export default eventRouter;

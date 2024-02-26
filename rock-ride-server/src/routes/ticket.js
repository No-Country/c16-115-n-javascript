import { Router } from "express";
import { deleteTicketHandler, getTicketsHandler, postTicketHandler } from "../handlers/tickets.handler.js";
import { verifyToken } from "../middlewares/auth-middleware.js";


const ticketRouter = Router();
ticketRouter.get("/", getTicketsHandler);
ticketRouter.post("/create", verifyToken, postTicketHandler);
ticketRouter.delete("/delete/:id", verifyToken, deleteTicketHandler);

export default ticketRouter;
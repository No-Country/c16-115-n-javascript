import { Router } from "express";
import { deleteTicketHandler, getTicketsHandler, postTicketHandler } from "../handlers/tickets.handler.js";


const ticketRouter = Router();
ticketRouter.get("/", getTicketsHandler);
ticketRouter.post("/create", postTicketHandler);
ticketRouter.delete("/delete/:id", deleteTicketHandler);

export default ticketRouter;
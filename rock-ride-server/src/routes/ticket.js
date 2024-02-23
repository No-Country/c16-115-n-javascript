import { Router } from "express";
import { getTicketsHandler, postTicketHandler } from "../handlers/tickets.handler.js";


const ticketRouter = Router();
ticketRouter.get("/", getTicketsHandler);
ticketRouter.post("/create", postTicketHandler);

export default ticketRouter;
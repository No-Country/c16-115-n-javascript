import { Router } from "express";
import { postTicketHandler } from "../handlers/tickets.handler.js";


const ticketRouter = Router();
ticketRouter.post("/create", postTicketHandler);

export default ticketRouter;
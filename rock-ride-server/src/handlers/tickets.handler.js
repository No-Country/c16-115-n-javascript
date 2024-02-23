import { createNewTicket, getTickets } from "../controllers/tickets.controller.js";

export const postTicketHandler = async (req, res) => {
    const { eventId } = req.body;
    const { id: userId} = req.user;
  
    if ( !eventId || !userId) {
      return res
        .status(400)
        .json({ ok: false, message: "All fields are required" });
    }
  
    try {
      const { ok, ticket, message, statusCode } = await createNewTicket(
        eventId,
        userId
      );
      
      res.status(statusCode).json({ ok, ticket, message });
    } catch (error) {
      console.error("Error in postTicketHandler:", error.message);
      res.status(500).json({ ok: false, message: "Internal server error" });
    }
  };

  export const getTicketsHandler = async (req, res) => {
    try {
      const { ok, tickets, message,statusCode } = await getTickets();
      res.status(statusCode).json({ ok, tickets, message });
    } catch (error) {
      console.error(error.message);
      res.status(500).json({ ok: false, message: "Internal server error" });
    }
  };
  
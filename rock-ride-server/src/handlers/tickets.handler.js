import { createNewTicket, deleteTicket, getTickets } from "../controllers/tickets.controller.js";
import { validate as validateUuid } from "uuid";

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
  
  
export const deleteTicketHandler = async (req, res) => {
  const ticketId = req.params.id;
  const { role: userRole } = req.user;
  
  if (!validateUuid(ticketId)) {
    return res
      .status(400)
      .json({ ok: false, message: "Invalid ticketId format" });
  }

  if (userRole !== "admin") return res.status(401).json({ok: false, message: "Unauthorized" })

  try {
    const {ok, message, statusCode} = await deleteTicket(ticketId);

    res.status(statusCode).json({ ok, message });
  } catch (error) {
    console.error("Error in deleteEventHandler:", error.message);
    res.status(500).json({ ok: false, message: "Internal server error" });
  }
};
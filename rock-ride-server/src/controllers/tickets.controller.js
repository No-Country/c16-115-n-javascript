import { Ticket, User, Event } from "../database.js";

export const createNewTicket = async (eventId, userId) => {
  try {
    const user = await User.findByPk(userId);
    if (!user) {
      return {
        ok: false,
        message: "User does not exist",
        statusCode: 403,
      };
    }

    const event = await Event.findByPk(eventId);
    if (!event) {
      return {
        ok: false,
        message: "Event does not exist",
        statusCode: 404,
      };
    }

    const ticket = await Ticket.create({
      eventId,
      userId,
    });

    return {
      ok: true,
      ticket,
      statusCode: 201,
    };
  } catch (error) {
    console.error("Error in createNewTicket:", error.message);
    return {
      ok: false,
      message: "Error creating ticket",
      statusCode: 500,
    };
  }
};

export const getTickets = async () => {
  try {
    const tickets = await Ticket.findAll({
      where: {
        deleted: false,
      }
    });
    return {
      ok: true,
      tickets,
      statusCode: 200,
    };
  } catch (error) {
    console.error("Error in getTickets:", error.message);
    return {
      ok: false,
      message: "Error fetching ticket",
      statusCode: 500,
    };
  }
};

export const deleteTicket = async (ticketId) => {
  try {
    const ticket = await Ticket.findByPk(ticketId);
    if (!ticket) return { ok: false, message: "Trip not found", statusCode: 404 };

    await Ticket.destroy({ where: { id: ticketId } });
    return {
      ok: true,
      message: "Ticket deleted successfully",
      statusCode: 200,
    };
  } catch (error) {
    console.error("Error in deletetTicketById:", error.message);
    throw new Error("Error deleting ticket by ID");
  }
};

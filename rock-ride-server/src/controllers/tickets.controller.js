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
      const tickets = await Ticket.findAll();
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
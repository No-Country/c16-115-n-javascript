import { Event } from "../database.js";

export const getEvents = async () => {
  try {
    const events = await Event.findAll();
    return {
      ok: true,
      events,
    };
  } catch (error) {
    console.error("Error in getEvents:", error.message);
    return {
      ok: false,
      message: "Error fetching events",
    };
  }
};

export const getEventById = async (eventId) => {
  try {
    const event = await Event.findByPk(eventId);
    return event;
  } catch (error) {
    console.error("Error in getEventById:", error.message);
    throw new Error("Error fetching event by ID");
  }
};

export const getEventByName = async (eventName) => {
  try {
    const event = await Event.findOne({
      where: { name: eventName },
    });

    return event;
  } catch (error) {
    console.error("Error in getEventByName:", error.message);
    throw new Error("Error fetching event by name");
  }
};

export const createNewEvent = async (name, location, date, category) => {
  try {
    const event = await Event.create({
      name,
      location,
      date,
      category,
    });

    return {
      ok: true,
      event,
    };
  } catch (error) {
    console.error("Error in createNewEvent:", error.message);
    return {
      ok: false,
      message: "Error creating event",
    };
  }
};

export const updateEvent = async (eventId, name, location, date, category) => {
  try {
    const [rowsUpdated, [updatedEvent]] = await Event.update(
      {
        name,
        location,
        date,
        category,
      },
      {
        where: { id: eventId },
        returning: true,
      }
    );

    if (rowsUpdated > 0) {
      return {
        ok: true,
        event: updatedEvent,
      };
    } else {
      return {
        ok: false,
        message: "Event not found",
      };
    }
  } catch (error) {
    console.error("Error in updateEvent:", error.message);
    return {
      ok: false,
      message: "Error updating event",
    };
  }
};

import { Op } from "sequelize";
import { Event } from "../database.js";
import { useLocation } from "../helpers/useLocation.js";

export const getEvents = async (name) => {
  try {
    if (name) {
      const events = await Event.findAll({
        where: {
          name: {
            [Op.iLike]: `%${name.toLowerCase()}%`,
          },
        },
      });
      if (!events.length) {
        return {
          ok: false,
          message: "Events not found",
        };
      } else {
        return {
          ok: true,
          events,
        };
      }
    }

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

export const createNewEvent = async (
  name,
  date,
  category,
  streetName,
  streetNumber,
  city,
  province,
  countryEvent
) => {
  const {
    ok,
    message,
    coordinates,
    streetNameGoogle,
    streetNumberGoogle,
    cityGoogle,
    stateOrProvince,
    country,
  } = await useLocation(
    `${streetName} ${streetNumber}`,
    city,
    province,
    countryEvent
  );

  if (!ok) return { ok, message };

  const formateAddres =
    streetNumberGoogle === null
      ? `${streetNameGoogle} ${streetNumber}`
      : `${streetNameGoogle} ${streetNumberGoogle}`;

  try {
    const event = await Event.create({
      name,
      address: formateAddres,
      location: coordinates,
      date,
      category,
      city: cityGoogle,
      stateOrProvince,
      country,
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

export const updateEvent = async (
  eventId,
  name,
  date,
  category,
  streetName,
  streetNumber,
  city,
  province,
  countryEvent
) => {
  const {
    ok,
    message,
    coordinates,
    streetNameGoogle,
    streetNumberGoogle,
    cityGoogle,
    stateOrProvince,
    country,
  } = await useLocation(
    `${streetName} ${streetNumber}`,
    city,
    province,
    countryEvent
  );

  if (!ok) return { ok, message };

  const formateAddres =
    streetNumberGoogle === null
      ? `${streetNameGoogle} ${streetNumber}`
      : `${streetNameGoogle} ${streetNumberGoogle}`;

  try {
    const [rowsUpdated, [updatedEvent]] = await Event.update(
      {
        name,
        address: formateAddres,
        location: coordinates,
        date,
        category,
        city: cityGoogle,
        stateOrProvince,
        country,
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

export const deleteEvent = async (eventId) => {
  try {
    const deletedEvent = await Event.destroy({
      where: { id: eventId },
    });

    return deletedEvent;
  } catch (error) {
    console.error("Error in deleteEventById:", error.message);
    throw new Error("Error deleting event by ID");
  }
};

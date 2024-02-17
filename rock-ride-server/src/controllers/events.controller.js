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

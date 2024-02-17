import { getEventById, getEvents } from "../controllers/events.controller.js";
import { validate as validateUuid } from "uuid";

export const getEventsHandler = async (req, res) => {
  try {
    const { ok, events } = await getEvents();
    res.status(200).json({ ok, events });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ ok: false, message: "Internal server error" });
  }
};

export const getEventByIdHandler = async (req, res) => {
  const eventId = req.params.id;

  if (!validateUuid(eventId)) {
    return res.status(400).json({ ok: false, message: "Invalid eventId format" });
  }

  try {
    const event = await getEventById(eventId);

    if (!event) {
      return res.status(404).json({ ok: false, message: "Event not found" });
    }

    return res.status(200).json({ ok: true, event });
  } catch (error) {
    console.error("Error in getEventByIdHandler:", error.message);
    return res.status(500).json({ ok: false, message: "Internal server error" });
  }
};

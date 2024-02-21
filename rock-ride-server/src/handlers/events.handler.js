import {
  createNewEvent,
  deleteEvent,
  getEventById,
  getEvents,
  updateEvent,
} from "../controllers/events.controller.js";
import { validate as validateUuid } from "uuid";

export const getEventsHandler = async (req, res) => {
  const { name } = req.query;
  try {
    const { ok, events, message } = await getEvents(name);
    res.status(200).json({ ok, events, message });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ ok: false, message: "Internal server error" });
  }
};

export const getEventByIdHandler = async (req, res) => {
  const eventId = req.params.id;

  if (!validateUuid(eventId)) {
    return res
      .status(400)
      .json({ ok: false, message: "Invalid eventId format" });
  }

  try {
    const event = await getEventById(eventId);

    if (!event) {
      return res.status(404).json({ ok: false, message: "Event not found" });
    }

    return res.status(200).json({ ok: true, event });
  } catch (error) {
    console.error("Error in getEventByIdHandler:", error.message);
    return res
      .status(500)
      .json({ ok: false, message: "Internal server error" });
  }
};

export const postEventHandler = async (req, res) => {
  const { name, location, date, category } = req.body;

  if (!name || !location || !date || !category) {
    return res
      .status(400)
      .json({ ok: false, message: "All fields are required" });
  }

  try {
    const { ok, event } = await createNewEvent(name, location, date, category);

    res.status(201).json({ ok, event });
  } catch (error) {
    console.error("Error in postEventHandler:", error.message);
    res.status(500).json({ ok: false, message: "Internal server error" });
  }
};

export const putEventHandler = async (req, res) => {
  const eventId = req.params.id;
  if (!validateUuid(eventId)) {
    return res
      .status(400)
      .json({ ok: false, message: "Invalid eventId format" });
  }

  const { name, location, date, category } = req.body;
  if (!eventId || !name || !location || !date || !category) {
    return res
      .status(400)
      .json({ ok: false, message: "All fields are required" });
  }

  try {
    const { ok, event } = await updateEvent(
      eventId,
      name,
      location,
      date,
      category
    );

    if (ok) {
      res.status(200).json({ ok, event });
    } else {
      res.status(404).json({ ok, message: "Event not found" });
    }
  } catch (error) {
    console.error("Error in putEventHandler:", error.message);
    res.status(500).json({ ok: false, message: "Internal server error" });
  }
};

export const deleteEventHandler = async (req, res) => {
  const eventId = req.params.id;
  if (!validateUuid(eventId)) {
    return res
      .status(400)
      .json({ ok: false, message: "Invalid eventId format" });
  }

  try {
    const deletedEventCount = await deleteEvent(eventId);

    if (deletedEventCount > 0) {
      res.status(200).json({ ok: true, message: "Event deleted successfully" });
    } else {
      res.status(404).json({ ok: false, message: "Event not found" });
    }
  } catch (error) {
    console.error("Error in deleteEventHandler:", error.message);
    res.status(500).json({ ok: false, message: "Internal server error" });
  }
};

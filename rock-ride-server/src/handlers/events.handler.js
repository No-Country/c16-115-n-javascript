import { getEvents } from "../controllers/events.controller.js";

export const getEventsHandler = async (req, res) => {
  try {
    const { ok, events } = await getEvents();
    res.status(200).json({ ok, events });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ ok: false, message: "Internal server error" });
  }
};

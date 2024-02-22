import { createNewTrip } from "../controllers/trips.controller.js";

export const postTripHandler = async (req, res) => {
  const { datetime, eventId, userId } = req.body;

  if (!datetime || !eventId || !userId) {
    return res
      .status(400)
      .json({ ok: false, message: "All fields are required" });
  }

  try {
    const { ok, trip, message } = await createNewTrip(
      datetime,
      eventId,
      userId
    );

    res.status(201).json({ ok, trip, message });
  } catch (error) {
    console.error("Error in postTripHandler:", error.message);
    res.status(500).json({ ok: false, message: "Internal server error" });
  }
};

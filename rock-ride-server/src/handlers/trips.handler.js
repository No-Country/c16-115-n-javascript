import { createNewTrip, getTripById, getTrips } from "../controllers/trips.controller.js";
import { validate as validateUuid } from "uuid";

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

export const getTripsHandler = async (req, res) => {
  try {
    const { ok, trips, message } = await getTrips();
    res.status(200).json({ ok, trips, message });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ ok: false, message: "Internal server error" });
  }
};

export const getTripByIdHandler = async (req, res) => {
  const tripId = req.params.id;

  if (!validateUuid(tripId)) {
    return res
      .status(400)
      .json({ ok: false, message: "Invalid tripId format" });
  }

  try {
    const trip = await getTripById(tripId);

    if (!trip) {
      return res.status(404).json({ ok: false, message: "Trip not found" });
    }

    return res.status(200).json({ ok: true, trip });
  } catch (error) {
    console.error("Error in getTripByIdHandler:", error.message);
    return res
      .status(500)
      .json({ ok: false, message: "Internal server error" });
  }
};
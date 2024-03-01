import { createNewTrip, deleteTrip, getTripById, getTrips, updateTrip } from "../controllers/trips.controller.js";
import { validate as validateUuid } from "uuid";

export const postTripHandler = async (req, res) => {
  const { datetime, eventId, places, occupants } = req.body;
  const { id: userId} = req.user;

  if (!datetime || !places || !occupants || !eventId || !userId) {
    return res
      .status(400)
      .json({ ok: false, message: "All fields are required" });
  }

  try {
    const { ok, trip, message, statusCode } = await createNewTrip(
      datetime,
      places,
      occupants,
      eventId,
      userId,
    );

    res.status(statusCode).json({ ok, trip, message });
  } catch (error) {
    console.error("Error in postTripHandler:", error.message);
    res.status(500).json({ ok: false, message: "Internal server error" });
  }
};

export const getTripsHandler = async (req, res) => {
  try {
    const { ok, trips, message,statusCode } = await getTrips();
    res.status(statusCode).json({ ok, trips, message });
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
    const {trip, statusCode, bookings, message} = await getTripById(tripId);
    return res.status(statusCode).json({ trip, bookings, message });
  } catch (error) {
    console.error("Error in getTripByIdHandler:", error.message);
    return res
      .status(500)
      .json({ ok: false, message: "Internal server error" });
  }
};

export const putTripHandler = async (req, res) => {
  const tripId = req.params.id;
  const { role: userRole, id: userId } = req.user;

  if (!validateUuid(tripId)) {
    return res
      .status(400)
      .json({ ok: false, message: "Invalid tripId format" });
  }

  const { datetime, eventId, places, occupants } = req.body;
  if (!datetime || !places || !occupants || !eventId || !userId) {
    return res
      .status(400)
      .json({ ok: false, message: "All fields are required" });
  }

  try {
    const { ok, trip, statusCode, message} = await updateTrip(
      tripId,
      datetime,
      places,
      occupants,
      eventId,
      userId,
      userRole,
    );

    res.status(statusCode).json({ ok, trip, message });
    
  } catch (error) {
    console.error("Error in putTripHandler:", error.message);
    res.status(500).json({ ok: false, message: "Internal server error" });
  }
};

export const deleteTripHandler = async (req, res) => {
  const tripId = req.params.id;
  const { role: userRole, id: userId } = req.user;
  
  if (!validateUuid(tripId)) {
    return res
      .status(400)
      .json({ ok: false, message: "Invalid tripId format" });
  }

  try {
    const {ok, message, statusCode} = await deleteTrip(tripId, userRole, userId);

    res.status(statusCode).json({ ok, message });
  } catch (error) {
    console.error("Error in deleteEventHandler:", error.message);
    res.status(500).json({ ok: false, message: "Internal server error" });
  }
};

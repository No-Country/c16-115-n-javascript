import { createNewTrip, deleteTrip, getTripById, getTrips, updateTrip } from "../controllers/trips.controller.js";
import { validate as validateUuid } from "uuid";

export const postTripHandler = async (req, res) => {
  const { datetime, eventId, userId } = req.body;
  const { role: userRole, id: userIdToken } = req.user;

  if (!datetime || !eventId || !userId) {
    return res
      .status(400)
      .json({ ok: false, message: "All fields are required" });
  }

  if(userRole==='user' && userId !== userIdToken){
    return res
    .status(403)
    .json({ ok: false, message: "Invalid user for create this trip" });
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

export const putTripHandler = async (req, res) => {
  const tripId = req.params.id;
  const { role: userRole, id: userIdToken } = req.user;

  if (!validateUuid(tripId)) {
    return res
      .status(400)
      .json({ ok: false, message: "Invalid tripId format" });
  }

  const { datetime, eventId, userId } = req.body;
  if (!datetime || !eventId || !userId) {
    return res
      .status(400)
      .json({ ok: false, message: "All fields are required" });
  }

  if(userRole==='user' && userId !== userIdToken){
    return res
    .status(403)
    .json({ ok: false, message: "Invalid user for update this trip" });
  }

  try {
    const { ok, trip } = await updateTrip(
      tripId,
      datetime,
      eventId,
      userId,
    );

    if (ok) {
      res.status(200).json({ ok, trip });
    } else {
      res.status(404).json({ ok, message: "Trip not found" });
    }
  } catch (error) {
    console.error("Error in putTripHandler:", error.message);
    res.status(500).json({ ok: false, message: "Internal server error" });
  }
};

export const deleteTripHandler = async (req, res) => {
  const eventId = req.params.id;
  const { role: userRole, id: userIdToken } = req.user;
  
  if (!validateUuid(eventId)) {
    return res
      .status(400)
      .json({ ok: false, message: "Invalid eventId format" });
  }

  try {
    const {ok, message} = await deleteTrip(eventId, userRole, userIdToken);

    if (ok) {
      res.status(200).json({ ok, message });
    } else {
      res.status(404).json({ ok, message });
    }
  } catch (error) {
    console.error("Error in deleteEventHandler:", error.message);
    res.status(500).json({ ok: false, message: "Internal server error" });
  }
};

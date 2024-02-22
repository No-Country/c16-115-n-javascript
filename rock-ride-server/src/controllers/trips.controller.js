import { Trip, User, Event } from "../database.js";

export const createNewTrip = async (
  datetime,
  eventId,
  userId
) => {
  try {
    const user = await User.findByPk(userId);
    if (!user || !user.isDriver) {
      return {
        ok: false,
        message: "Invalid user for creating a trip",
      };
    }

    const event = await Event.findByPk(eventId);
    if (!event) {
      return {
        ok: false,
        message: "Event does not exist",
      };
    }

    const trip = await Trip.create({
      datetime,
      origin: user.location,
      eventId,
      userId,
    });

    return {
      ok: true,
      trip,
    };
  } catch (error) {
    console.error("Error in createNewTrip:", error.message);
    return {
      ok: false,
      message: "Error creating trip",
    };
  }
};

export const getTrips = async () => {
  try {

    const trips = await Trip.findAll();
    return {
      ok: true,
      trips,
    };
  } catch (error) {
    console.error("Error in getTrips:", error.message);
    return {
      ok: false,
      message: "Error fetching trips",
    };
  }
};

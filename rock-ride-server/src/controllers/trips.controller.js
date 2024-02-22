import { Trip, User, Event } from "../database.js";

export const createNewTrip = async (datetime, eventId, userId) => {
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

export const getTripById = async (tripId) => {
  try {
    const trip = await Trip.findByPk(tripId);
    return trip;
  } catch (error) {
    console.error("Error in getTripById:", error.message);
    throw new Error("Error fetching trip by ID");
  }
};

export const updateTrip = async (tripId, datetime, eventId, userId) => {
  try {
    const user = await User.findByPk(userId);
    if (!user || !user.isDriver) {
      return {
        ok: false,
        message: "Invalid user for updating a trip",
      };
    }

    const event = await Event.findByPk(eventId);
    if (!event) {
      return {
        ok: false,
        message: "Event does not exist",
      };
    }

    const [rowsUpdated, [updatedTrip]] = await Trip.update(
      {
        datetime,
        origin: user.location,
        eventId,
        userId,
      },
      {
        where: { id: tripId },
        returning: true,
      }
    );

    if (rowsUpdated > 0) {
      return {
        ok: true,
        trip: updatedTrip,
      };
    } else {
      return {
        ok: false,
        message: "Trip not found",
      };
    }
  } catch (error) {
    console.error("Error in updateTrip:", error.message);
    return {
      ok: false,
      message: "Error updating trip",
    };
  }
};

export const deleteTrip = async (tripId, roleUser, userIdToken) => {
  try {
    const trip = await Trip.findByPk(tripId);

    if (!trip) return { ok: false, message: "Event not found" };

    if (roleUser === "user" && trip.userId !== userIdToken) {
      return {
        ok: false,
        message: "Invalid user for delete this trip",
      };
    }

    await Trip.destroy({ where: { id: tripId } });
    return {
      ok: true,
      message: "Event deleted successfully",
    };
  } catch (error) {
    console.error("Error in deletetTripById:", error.message);
    throw new Error("Error deleting trip by ID");
  }
};

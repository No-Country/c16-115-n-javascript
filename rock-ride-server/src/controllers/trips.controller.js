import { Trip, User, Event, Ticket} from "../database.js";

export const createNewTrip = async (datetime, places, occupants, eventId, userId) => {
  try {

    const ticket =  await Ticket.findOne({ where: { userId: userId, eventId: eventId }})
    if(!ticket){
      return {
        ok: false,
        message: "The user does not have a ticket for the event",
        statusCode: 404,
      };
    }

    const user = await User.findByPk(userId);
    if (!user || !user.isDriver) {
      return {
        ok: false,
        message: "Invalid user for creating a trip",
        statusCode: 403,
      };
    }

    const event = await Event.findByPk(eventId);
    if (!event) {
      return {
        ok: false,
        message: "Event does not exist",
        statusCode: 404,
      };
    }

    const trip = await Trip.create({
      datetime,
      origin: user.location,
      places,
      occupants,
      eventId,
      userId,
    });

    return {
      ok: true,
      trip,
      statusCode: 201,
    };
  } catch (error) {
    console.error("Error in createNewTrip:", error.message);
    return {
      ok: false,
      message: "Error creating trip",
      statusCode: 500,
    };
  }
};

export const getTrips = async () => {
  try {
    const trips = await Trip.findAll();
    return {
      ok: true,
      trips,
      statusCode: 200,
    };
  } catch (error) {
    console.error("Error in getTrips:", error.message);
    return {
      ok: false,
      message: "Error fetching trips",
      statusCode: 500,
    };
  }
};

export const getTripById = async (tripId) => {
  try {
    const trip = await Trip.findByPk(tripId);
    if (!trip) {
      return {
        message: "Trip not found",
        statusCode: 404,
      };
    }
    return {trip, statusCode:200};
  } catch (error) {
    console.error("Error in getTripById:", error.message);
    throw new Error("Error fetching trip by ID");
  }
};

export const updateTrip = async (tripId, datetime, places, occupants, eventId, userId, userRole) => {
  try {

    const ticket =  await Ticket.findOne({ where: { userId: userId, eventId: eventId }})
    if(!ticket){
      return {
        ok: false,
        message: "The user does not have a ticket",
        statusCode: 404,
      };
    }

    const user = await User.findByPk(userId);
    if (!user || !user.isDriver) {
      return {
        ok: false,
        message: "Invalid user for updating a trip",
        statusCode: 403
      };
    }

    const event = await Event.findByPk(eventId);
    if (!event) {
      return {
        ok: false,
        message: "Event does not exist",
        statusCode: 404
      };
    }

    const trip = await Trip.findByPk(tripId);
    if (!trip) return { ok: false, message: "Trip not found", statusCode: 404 };

    if (userRole === "user" && trip.userId !== userId) {
      return {
        ok: false,
        message: "Invalid user for update this trip",
        statusCode: 403
      };
    }

    const [rowsUpdated, [updatedTrip]] = await Trip.update(
      {
        datetime,
        origin: user.location,
        places,
        occupants,
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
        message: "Trip updated",
        statusCode: 200
      };
    } else {
      return {
        ok: false,
        message: "Trip not found",
        statusCode: 404
      };
    }
  } catch (error) {
    console.error("Error in updateTrip:", error.message);
    return {
      ok: false,
      message: "Error updating trip",
      statusCode: 500
    };
  }
};

export const deleteTrip = async (tripId, userRole, userId) => {
  try {
    const trip = await Trip.findByPk(tripId);

    if (!trip) return { ok: false, message: "Trip not found", statusCode: 404 };

    if (userRole === "user" && trip.userId !== userId) {
      return {
        ok: false,
        message: "Invalid user for delete this trip",
        statusCode: 403
      };
    }

    await Trip.destroy({ where: { id: tripId } });
    return {
      ok: true,
      message: "Event deleted successfully",
      statusCode: 200
    };
  } catch (error) {
    console.error("Error in deletetTripById:", error.message);
    throw new Error("Error deleting trip by ID");
  }
};

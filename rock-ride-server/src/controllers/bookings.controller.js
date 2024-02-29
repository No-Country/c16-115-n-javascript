import { Trip, User, Ticket, Booking } from "../database.js";

export const createNewBooking = async (tripId, userId) => {
  try {
    const trip = await Trip.findByPk(tripId);
    if (!trip || trip.deleted) {
      return {
        ok: false,
        message: "Trip does not exist",
        statusCode: 403,
      };
    }

    const user = await User.findByPk(userId);
    if (!user || trip.userId === userId) {
      return {
        ok: false,
        message: "Invalid user for creating a booking in this trip",
        statusCode: 403,
      };
    }

    const ticket = await Ticket.findOne({
      where: { userId: userId, eventId: trip.eventId },
    });
    if (!ticket) {
      return {
        ok: false,
        message: "The user does not have a ticket for the event",
        statusCode: 404,
      };
    }

    const bookingOne = await Booking.findOne({
      where: { userId: userId, tripId: tripId },
    });
    if (bookingOne) {
      return {
        ok: false,
        message: "The user already has a booking",
        statusCode: 409,
      };
    }

    const booking = await Booking.create({
      tripId,
      userId,
    });

    return {
      ok: true,
      booking,
      statusCode: 201,
    };
  } catch (error) {
    console.error("Error in createNewBooking:", error.message);
    return {
      ok: false,
      message: "Error creating booking",
      statusCode: 500,
    };
  }
};

export const getBookings = async () => {
  try {
    const bookings = await Booking.findAll();
    return {
      ok: true,
      bookings,
      statusCode: 200,
    };
  } catch (error) {
    console.error("Error in getBookings:", error.message);
    return {
      ok: false,
      message: "Error fetching bookings",
      statusCode: 500,
    };
  }
};

export const getBookingById = async (bookingId) => {
  try {
    const booking = await Booking.findByPk(bookingId);
    if (!booking) {
      return {
        message: "Booking not found",
        statusCode: 404,
      };
    }
    return { booking, statusCode: 200 };
  } catch (error) {
    console.error("Error in getBookingById:", error.message);
    throw new Error("Error fetching booking by ID");
  }
};

export const updateBooking = async (status, userId, userRole, bookingId) => {
  try {
    const user = await User.findByPk(userId);
    if (!user || !user.isDriver) {
      return {
        ok: false,
        message: "Invalid user for updating this booking",
        statusCode: 403,
      };
    }

    const booking = await Booking.findByPk(bookingId);
    if (!booking)
    return { ok: false, message: "Booking not found", statusCode: 404 };

    if(booking.status === "canceled"){
      return { ok: false, message: "Booking canceled", statusCode: 404 };
    }

    const trip = await Trip.findByPk(booking.tripId);
    if (!trip || trip.deleted) return { ok: false, message: "Trip not found", statusCode: 404 };

    if (userRole === "user" && trip.userId !== userId) {
      return {
        ok: false,
        message: "Invalid user for update this booking",
        statusCode: 403,
      };
    }

    const [rowsUpdated, [updatedBooking]] = await Booking.update(
      {
        eventId: booking.eventId,
        userId: booking.userId,
        status,
      },
      {
        where: { id: bookingId },
        returning: true,
      }
    );

    if (
      status === "accepted" &&
      !trip.occupants.includes(booking.userId) &&
      trip.occupants.length < trip.places
    ) {
      await Trip.update(
        {
          occupants: [...trip.occupants, booking.userId],
        },
        {
          where: { id: booking.tripId },
          returning: true,
        }
      );
    } else if (
      status === "rejected" &&
      trip.occupants.includes(booking.userId)
    ) {
      await Trip.update(
        {
          occupants: trip.occupants.filter(
            (occupantId) => occupantId !== booking.userId
          ),
        },
        {
          where: { id: booking.tripId },
          returning: true,
        }
      );
    }

    const updatedTrip = await Trip.findByPk(booking.tripId);

    if (rowsUpdated > 0) {
      return {
        ok: true,
        booking: updatedBooking,
        trip: updatedTrip,
        message: "Booking updated in trip",
        statusCode: 200,
      };
    } else {
      return {
        ok: false,
        message: "Booking not found",
        statusCode: 404,
      };
    }
  } catch (error) {
    console.error("Error in updateBooking:", error.message);
    return {
      ok: false,
      message: "Error updating booking",
      statusCode: 500,
    };
  }
};

export const deleteBooking = async (bookingId, userRole, userId) => {
  try {
    const booking = await Booking.findByPk(bookingId);
    if (!booking) return { ok: false, message: "Booking not found", statusCode: 404 };

    if (userRole === "user" && booking.userId !== userId) {
      return {
        ok: false,
        message: "Invalid user for delete this booking",
        statusCode: 403
      };
    }

    const trip = await Trip.findByPk(booking.tripId);
    if (!trip) return { ok: false, message: "Trip not found", statusCode: 404 };

    if (
      trip.occupants.includes(booking.userId)
    ) {
      await Trip.update(
        {
          occupants: trip.occupants.filter(
            (occupantId) => occupantId !== booking.userId
          ),
        },
        {
          where: { id: booking.tripId },
          returning: true,
        }
      );
    }

    const [rowsUpdated, [deletedBooking]] = await Booking.update(
      {
        eventId: booking.eventId,
        userId: booking.userId,
        status: "canceled",
      },
      {
        where: { id: bookingId },
        returning: true,
      }
    );

    if (rowsUpdated > 0) {
      return {
        ok: true,
        booking: deletedBooking,
        message: "Booking deleted in trip",
        statusCode: 200,
      };
    } else {
      return {
        ok: false,
        message: "Booking not found",
        statusCode: 404,
      };
    }
  } catch (error) {
    console.error("Error in deletetBookingById:", error.message);
    throw new Error("Error deleting trip by ID");
  }
};

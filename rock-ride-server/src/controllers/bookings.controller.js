import { Trip, User, Ticket, Booking} from "../database.js";

export const createNewBooking = async (tripId, userId) => {
    try {  
      const trip = await Trip.findByPk(tripId);
      if (!trip) {
        return {
          ok: false,
          message: "Trip does not exist",
          statusCode: 403,
        };
      }

      const user = await User.findByPk(userId);
      if (!user || user.isDriver) {
        return {
          ok: false,
          message: "Invalid user for creating a booking",
          statusCode: 403,
        };
      }

      const ticket =  await Ticket.findOne({ where: { userId: userId, eventId: trip.eventId }})
      if(!ticket){
        return {
          ok: false,
          message: "The user does not have a ticket for the event",
          statusCode: 404,
        };
      }

      const bookingOne =  await Booking.findOne({ where: { userId: userId, tripId: tripId }})
      if(bookingOne){
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
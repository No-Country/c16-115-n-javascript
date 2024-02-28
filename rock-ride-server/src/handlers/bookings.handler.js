import {
  createNewBooking,
  getBookingById,
  getBookings,
  updateBooking,
} from "../controllers/bookings.controller.js";
import { validate as validateUuid } from "uuid";

export const postBookingHandler = async (req, res) => {
  const { tripId } = req.body;
  const { id: userId } = req.user;

  if (!tripId || !userId) {
    return res
      .status(400)
      .json({ ok: false, message: "All fields are required" });
  }

  try {
    const { ok, booking, message, statusCode } = await createNewBooking(
      tripId,
      userId
    );

    res.status(statusCode).json({ ok, booking, message });
  } catch (error) {
    console.error("Error in postBookingHandler:", error.message);
    res.status(500).json({ ok: false, message: "Internal server error" });
  }
};

export const getBookingsHandler = async (req, res) => {
  try {
    const { ok, bookings, message, statusCode } = await getBookings();
    res.status(statusCode).json({ ok, bookings, message });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ ok: false, message: "Internal server error" });
  }
};

export const getBookingByIdHandler = async (req, res) => {
  const bookingId = req.params.id;

  if (!validateUuid(bookingId)) {
    return res
      .status(400)
      .json({ ok: false, message: "Invalid bookingId format" });
  }

  try {
    const {booking, statusCode, message} = await getBookingById(bookingId);
    return res.status(statusCode).json({ booking, message });
  } catch (error) {
    console.error("Error in getBookingByIdHandler:", error.message);
    return res
      .status(500)
      .json({ ok: false, message: "Internal server error" });
  }
};

export const putBookingHandler = async (req, res) => {
  const bookingId = req.params.id;
  const { role: userRole, id: userId } = req.user;

  if (!validateUuid(bookingId)) {
    return res
      .status(400)
      .json({ ok: false, message: "Invalid bookingId format" });
  }

  const { status } = req.body;
  if (!status|| !bookingId || !userId || !userRole) {
    return res
      .status(400)
      .json({ ok: false, message: "All fields are required" });
  }

  try {
    const { ok, booking, trip, statusCode, message} = await updateBooking(
      status,
      userId,
      userRole,
      bookingId
    );

    res.status(statusCode).json({ ok, booking, trip, message });
    
  } catch (error) {
    console.error("Error in putBookingHandler:", error.message);
    res.status(500).json({ ok: false, message: "Internal server error" });
  }
};

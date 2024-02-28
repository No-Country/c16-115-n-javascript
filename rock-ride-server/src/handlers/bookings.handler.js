import { createNewBooking } from "../controllers/bookings.controller.js";

export const postBookingHandler = async (req, res) => {
  const { tripId } = req.body;
  const { id: userId} = req.user;

  if (!tripId || !userId) {
    return res
      .status(400)
      .json({ ok: false, message: "All fields are required" });
  }

  try {
    const { ok, booking, message, statusCode } = await createNewBooking(
      tripId,
      userId,
    );

    res.status(statusCode).json({ ok, booking, message });
  } catch (error) {
    console.error("Error in postBookingHandler:", error.message);
    res.status(500).json({ ok: false, message: "Internal server error" });
  }
};
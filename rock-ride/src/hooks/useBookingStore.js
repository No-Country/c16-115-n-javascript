import { useDispatch, useSelector } from "react-redux";
import { driveRockApi } from "../api";
import { onAddNewBooking, onDeleteBooking, onLoadBookings, onSetActiveBooking } from "../redux/features/bookingSlice";

export const useBookingStore = () => {
  const dispatch = useDispatch();
  const { bookings, activeBooking } = useSelector((state) => state.booking);
  const { activeTrip } = useSelector((state) => state.trip);

  const setActiveBooking = (booking) => {
    dispatch(onSetActiveBooking(booking));
  };

  const startNewBooking = async () => {
    try {
      const { data } = await driveRockApi.post("/bookings/create", {
        tripId: activeTrip.id,
      });
      dispatch(onAddNewBooking({ ...data.booking }));
      return { ok: true, data };
    } catch (error) {
      console.log(error);
      return { ok: false, error: error.response.data.message };
    }
  };

  const startLoadingTrips = async () => {
    try {
      const { data } = await driveRockApi.get("/bookings");
      dispatch(onLoadBookings(data.bookings));
    } catch (error) {
      console.log("Error cargando reservas", error);
    }
  };

  const startDeletingTrip = async () => {
    try {
      await driveRockApi.delete(`/bookings/${activeBooking.id}`);
      dispatch(onDeleteBooking());
    } catch (error) {
      console.log(error);
    }
  };

  return {
    activeBooking,
    bookings,
    hasTripSelected: !!activeBooking,

    setActiveBooking,
    startNewBooking,
    startDeletingTrip,
    startLoadingTrips,
  };
};

import { useDispatch, useSelector } from "react-redux";
import { driveRockApi } from "../api";
import {
  onAddNewTrip,
  onDeleteTrip,
  onLoadTrips,
  onSetActiveTrip,
} from "../redux/features/tripSlice";

export const useTripStore = () => {
  const dispatch = useDispatch();
  const { trips, activeTrip } = useSelector((state) => state.trip);
  const { activeEvent } = useSelector((state) => state.event);

  const setActiveTrip = (trip) => {
    dispatch(onSetActiveTrip(trip));
  };

  const startNewTrip = async (trip) => {
    try {
      const { data } = await driveRockApi.post("/trips/create", {
        ...trip,
        occupants: [],
        eventId: activeEvent.id,
      });
      dispatch(onAddNewTrip({ ...data.trip }));
      return { ok: true, data };
    } catch (error) {
      console.log(error);
      return { ok: false, error: error.response.data.message };
    }
  };

  const startLoadingTrips = async () => {
    try {
      const { data } = await driveRockApi.get("/trips");
      /* const tripsforUser = data.trips.filter(
        (trip) => trips.userId == user.uid
      ); */

      dispatch(onLoadTrips(data.trips));
    } catch (error) {
      console.log("Error cargando viajes", error);
    }
  };

  const startDeletingTrip = async () => {
    try {
      await driveRockApi.delete(`/trips/${activeTrip.id}`);
      dispatch(onDeleteTrip());
    } catch (error) {
      console.log(error);
      /*  Swal.fire("Error al eliminar", error.response.data.msg, "error"); */
    }
  };

  return {
    activeTrip,
    trips,
    hasTripSelected: !!activeTrip,

    setActiveTrip,
    startNewTrip,
    startDeletingTrip,
    startLoadingTrips,
  };
};

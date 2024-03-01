import { useDispatch, useSelector } from "react-redux"
import { driveRockApi } from "../api";
import { onAddNewTrip, onDeleteTrip, onLoadTrips, onSetActiveTrip } from "../redux/features/tripSlice";

export const useTripStore = () => {
  const dispatch = useDispatch();
  const { trips, activeTrip } = useSelector((state) => state.trip);
  const { user } = useSelector((state) => state.auth);

  const setActiveTrip = (trip) => {
    dispatch(onSetActiveTrip(trip));
  };

  const startNewTrip = async (trip) => {
    try {
      const { data } = await driveRockApi.post("/trips", trip);
      dispatch(onAddNewTrip({ ...trip, id: data.trip.id, userId: user.id }));
    } catch (error) {
      console.log(error);
      /* Swal.fire("Error al guardar", error.response.data.msg, "error"); */
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

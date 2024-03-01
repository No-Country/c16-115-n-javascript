import { useDispatch, useSelector } from "react-redux"
import { driveRockApi } from "../api";
import { onAddNewEvent, onDeleteEvent, onLoadEvents, onSetActiveEvent } from "../redux/features/eventSlice";


export const useEventStore = () => {
  const dispatch = useDispatch();
  const { events, activeEvent } = useSelector((state) => state.event);
  
  const setActiveEvent = (event) => {
    dispatch(onSetActiveEvent(event));
  };

  const startNewEvent = async (event) => {
    try {
      const { data } = await driveRockApi.post("/events", event);
      dispatch(onAddNewEvent({ ...event, id: data.event.id }));
    } catch (error) {
      console.log(error);
      /* Swal.fire("Error al guardar", error.response.data.msg, "error"); */
    }
  };

  const startLoadingEvents = async () => {
    try {
      const { data } = await driveRockApi.get("/events");
      /* const tripsforUser = data.trips.filter(
        (trip) => trips.userId == user.uid
      ); */
      
      dispatch(onLoadEvents(data.events));
    } catch (error) {
      console.log("Error cargando eventos", error);
    }
  };

  const startDeletingEvent = async () => {
    try {
      await driveRockApi.delete(`/trips/${activeEvent.id}`);
      dispatch(onDeleteEvent());

    } catch (error) {
      console.log(error);
     /*  Swal.fire("Error al eliminar", error.response.data.msg, "error"); */
    }
  };

  return {
    activeEvent,
    events,
    hasEventSelected: !!activeEvent,

    setActiveEvent,
    startNewEvent,
    startDeletingEvent,
    startLoadingEvents,
  };
};

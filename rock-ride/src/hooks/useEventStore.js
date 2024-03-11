import { useDispatch, useSelector } from "react-redux"
import { driveRockApi } from "../api";
import { onAddNewEvent, onDeleteEvent, onLoadEvents, onSetActiveEvent, onUpdateEvent } from "../redux/features/eventSlice";


export const useEventStore = () => {
  const dispatch = useDispatch();
  const { events, activeEvent } = useSelector((state) => state.event);
  
  const setActiveEvent = (event) => {
    dispatch(onSetActiveEvent(event));
  };

  const startNewEvent = async (event) => {
    try {
      const { data } = await driveRockApi.post("/events/create", event);

      dispatch(onAddNewEvent( data.event ));

      return data
    } catch (error) {
      console.log(error);
      /* Swal.fire("Error al guardar", error.response.data.msg, "error"); */
    }
  };

  const startEditEvent = async (dataEvent, id) => {
    try {
      const { data } = await driveRockApi.put(`/events/update/${id}`, dataEvent);
      dispatch(onUpdateEvent( data.event ));

      return data

    } catch (error) {
      console.log(error);
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
    startEditEvent,
    startDeletingEvent,
    startLoadingEvents,
  };
};

import { useDispatch, useSelector } from "react-redux";
import { driveRockApi } from "../api";
import { onAddNewTicket, onDeleteTicket, onLoadTickets, onSetActiveTicket } from "../redux/features/ticketSlice";


export const useTicketStore = () => {
  const dispatch = useDispatch();
  const { tickets, activeTicket } = useSelector((state) => state.ticket);
  const { activeEvent } = useSelector((state) => state.event);

  const setActiveTicket = (ticket) => {
    dispatch(onSetActiveTicket(ticket));
  };

  const startNewTicket = async () => {
    try {
      const { data } = await driveRockApi.post("/tickets/create", {
        eventId: activeEvent.id,
      });
      dispatch(onAddNewTicket({ ...data.ticket }));
      return { ok: true, data };
    } catch (error) {
      console.log(error);
      return { ok: false, error: error.response.data.message };
    }
  };

  const startLoadingTickets = async () => {
    try {
      const { data } = await driveRockApi.get("/tickets");
      dispatch(onLoadTickets(data.tickets));
    } catch (error) {
      console.log("Error cargando viajes", error);
    }
  };

  const startDeletingTicket = async () => {
    try {
      await driveRockApi.delete(`/tickets/${activeTicket.id}`);
      dispatch(onDeleteTicket());
    } catch (error) {
      console.log(error);
    }
  };

  return {
    activeTicket,
    tickets,
    hasTicketSelected: !!activeTicket,

    setActiveTicket,
    startNewTicket,
    startDeletingTicket,
    startLoadingTickets,
  };
};

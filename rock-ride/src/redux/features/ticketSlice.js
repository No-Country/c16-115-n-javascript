import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    tickets: [
    ],
    isLoadingTickets: true,
    activeTicket: null
}

export const ticketSlice = createSlice({
  name: 'ticket',
  initialState,
  reducers: {
    onSetActiveTicket: (state, {payload}) => {
        state.activeTicket = payload
    },
    onAddNewTicket: (state, {payload}) => {
        state.tickets.push(payload);
        state.activeTicket = null 
    },
    onDeleteTicket: (state) => {
        if(state.activeTicket){
            state.tickets = state.tickets.filter(ticket => ticket.id !== state.activeTicket.id);
            state.activeTicket = null;
        }
    },
    onLoadTickets: (state, {payload =[]}) => {
        state.isLoadingTickets = false;
        payload.forEach(ticket => {
            const exists = state.tickets.some(dbTicket => dbTicket.id === ticket.id);
            if(!exists){
                state.tickets.push(ticket);
            }
        });
    },
    onCleanActive: (state) => {
        state.activeTicket = null;
    }
  }
});

export const {onSetActiveTicket, onAddNewTicket, onDeleteTicket, onLoadTickets, onCleanActive} = ticketSlice.actions
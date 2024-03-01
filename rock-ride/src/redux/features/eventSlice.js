import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    events: [
    ],
    isLoadingEvents: true,
    activeEvent: null
}

export const eventSlice = createSlice({
  name: 'event',
  initialState,
  reducers: {
    onSetActiveEvent: (state, {payload}) => {
        state.activeEvent = payload
    },
    onAddNewEvent: (state, {payload}) => {
        state.events.push(payload);
        state.activeEvent = null 
    },
    onUpdateEvent: (state, {payload}) => {
        state.events = state.events.map(event => {
            if(event.id === payload.id) return payload;
            return event
        })
    },
    onDeleteEvent: (state) => {
        if(state.activeEvent){
            state.events = state.events.filter(event => event.id !== state.activeEvent.id);
            state.activeEvent = null;
        }
    },
    onLoadEvents: (state, {payload =[]}) => {
        state.isLoadingEvents = false;
        payload.forEach(event => {
            const exists = state.events.some(dbEvent => dbEvent.id === event.id);
            if(!exists){
                state.events.push(event);
            }
        });
    },
    onCleanActive: (state) => {
        state.activeEvent = null;
    }
  }
});

export const {onSetActiveEvent, onAddNewEvent, onUpdateEvent, onDeleteEvent, onLoadEvents, onCleanActive} = eventSlice.actions
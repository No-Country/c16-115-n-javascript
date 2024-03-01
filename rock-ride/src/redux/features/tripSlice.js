import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    trips: [
    ],
    isLoadingTrips: true,
    activeTrip: null
}

export const tripSlice = createSlice({
  name: 'trip',
  initialState,
  reducers: {
    onSetActiveTrip: (state, {payload}) => {
        state.activeTrip = payload
    },
    onAddNewTrip: (state, {payload}) => {
        state.trips.push(payload);
        state.activeTrip = null 
    },
    onUpdateTrip: (state, {payload}) => {
        state.trips = state.trips.map(trip => {
            if(trip.id === payload.id) return payload;
            return trip
        })
    },
    onDeleteTrip: (state) => {
        if(state.activeTrip){
            state.trips = state.trips.filter(trip => trip.id !== state.activeTrip.id);
            state.activeTrip = null;
        }
    },
    onLoadTrips: (state, {payload =[]}) => {
        state.isLoadingTrips = false;
        payload.forEach(trip => {
            const exists = state.trips.some(dbEvent => dbEvent.id === trip.id);
            if(!exists){
                state.trips.push(trip);
            }
        });
    },
    onCleanActive: (state) => {
        state.activeTrip = null;
    }
  }
});

export const {onSetActiveTrip, onAddNewTrip, onUpdateTrip, onDeleteTrip, onLoadTrips, onCleanActive} = tripSlice.actions
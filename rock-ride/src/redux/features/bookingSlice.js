import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    bookings: [
    ],
    isLoadingTrips: true,
    activeBooking: null
}

export const bookingSlice = createSlice({
  name: 'booking',
  initialState,
  reducers: {
    onSetActiveBooking: (state, {payload}) => {
        state.activeBooking = payload
    },
    onAddNewBooking: (state, {payload}) => {
        state.bookings.push(payload);
        state.activeBooking = null 
    },
    onUpdateBooking: (state, {payload}) => {
        state.bookings = state.bookings.map(booking => {
            if(booking.id === payload.id) return payload;
            return booking
        })
    },
    onDeleteBooking: (state) => {
        if(state.activeBooking){
            state.bookings = state.bookings.filter(booking => booking.id !== state.activeBooking.id);
            state.activeBooking = null;
        }
    },
    onLoadBookings: (state, {payload =[]}) => {
        state.isLoadingTrips = false;
        payload.forEach(booking => {
            const exists = state.bookings.some(dbEvent => dbEvent.id === booking.id);
            if(!exists){
                state.bookings.push(booking);
            }
        });
    },
    onCleanActive: (state) => {
        state.activeBooking = null;
    }
  }
});

export const {onSetActiveBooking, onAddNewBooking, onUpdateBooking, onDeleteBooking, onLoadBookings, onCleanActive} = bookingSlice.actions
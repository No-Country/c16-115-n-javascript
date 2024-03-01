import { configureStore } from "@reduxjs/toolkit"
import { eventSlice } from "./features/eventSlice"
import { tripSlice } from "./features/tripSlice"
import { authSlice } from "./features/authSlice"


export const store = configureStore({
    reducer: {
        event: eventSlice.reducer,
        trip: tripSlice.reducer,
        auth: authSlice.reducer,
    }
})

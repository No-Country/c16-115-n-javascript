import { configureStore } from "@reduxjs/toolkit"
import eventReducer from "./features/event-slice"


export const store = configureStore({
    reducer: {
        eventReducer        
    }
})

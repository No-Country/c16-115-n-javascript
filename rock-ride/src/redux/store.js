import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { eventSlice } from "./features/eventSlice";
import { tripSlice } from "./features/tripSlice";
import { authSlice } from "./features/authSlice";
import { ticketSlice } from "./features/ticketSlice";
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

const persistConfig = {
  key: 'root',
  storage,
};

const rootReducer = combineReducers({
  event: eventSlice.reducer,
  trip: tripSlice.reducer,
  auth: authSlice.reducer,
  ticket: ticketSlice.reducer
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
});

export const persistor = persistStore(store);

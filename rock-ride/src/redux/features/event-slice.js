import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";



const initialState = {
  allEvents: [],  
};
export const fetchEvents = createAsyncThunk(
  "event/fetchEvents",
  async () => {
    const res = await axios.get(
      "http://localhost:3001/events"
    );
    return res.data;
  }
);



export const events = createSlice({
  name: "events",
  initialState,    
  extraReducers: (builder) => {
    builder.addCase(fetchEvents.fulfilled, (state, action) => {
      state.allEvents = action.payload;
      state.loading = false;
      state.error = "";
    });
    builder.addCase(fetchEvents.rejected, (state, action) => {
      state.allEvents = [];
      state.error = action.error.message;
      state.loading = false;
    })
  },
});

export const selectAllEvents = (state) => state.allEvents;

export default events.reducer;
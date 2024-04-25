
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  slides: [],
  loading: false,
  error: null
};

const slideSlice = createSlice({
  name: "slides",
  initialState,
  reducers: {
    fetchslideRequest(state) {
      state.loading = true;
    },
    fetchslideSucces(state, action) {
      state.loading = false;
      state.slides = action.payload;
      state.error = null;
    },
    fetchslideFailure(state, action) {
      state.loading = false;
      state.error = action.payload;
    },
  }
});

export const {
  fetchslideRequest,
  fetchslideSucces, 
  fetchslideFailure,
 } = slideSlice.actions;

export default slideSlice.reducer;
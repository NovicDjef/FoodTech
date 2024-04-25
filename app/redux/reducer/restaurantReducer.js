
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  restaurants: [],
  loading: false,
  error: null
};

const restaurantSlice = createSlice({
  name: "restaurants",
  initialState,
  reducers: {
    fetchrestaurantRequest(state) {
      state.loading = true;
    },
    fetchrestaurantSucces(state, action) {
      state.loading = false;
      state.restaurants = action.payload;
      state.error = null;
    },
    fetchrestaurantFailure(state, action) {
      state.loading = false;
      state.error = action.payload;
    },
  }
});

export const {
  fetchrestaurantRequest,
  fetchrestaurantSucces, 
  fetchrestaurantFailure,
 } = restaurantSlice.actions;

export default restaurantSlice.reducer;
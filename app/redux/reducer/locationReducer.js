import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  loading: false,
  error: null,
  geolocation: [],
};

const locationSlice = createSlice({
  name: 'location',
  initialState,
  reducers: {
    fetchGeolocationRequest: (state) => {
      state.loading = true;
      state.error = null;
    },
    fetchGeolocationSuccess: (state, action) => {
      state.loading = false;
      state.geolocation = action.payload;
    },
    fetchGeolocationFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const { fetchGeolocationRequest, fetchGeolocationSuccess, fetchGeolocationFailure } = locationSlice.actions;
export default locationSlice.reducer;

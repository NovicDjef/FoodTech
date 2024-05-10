import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  loading: false,
  error: null,
  villes: [],
};

const villeSlice = createSlice({
  name: 'villes',
  initialState,
  reducers: {
    VilleRequest: (state) => {
      state.loading = true;
      state.error = null;
    },
    VilleSuccess: (state, action) => {
      state.loading = false;
      state.villes = action.payload;
    },
    VilleFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const { VilleRequest, VilleSuccess, VilleFailure } = villeSlice.actions;
export default villeSlice.reducer;

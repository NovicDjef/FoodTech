import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  loading: false,
  error: null,
  livraison: [],
};

const livraisonSlice = createSlice({
  name: 'livraison',
  initialState,
  reducers: {
    adressLivraisonRequest: (state) => {
      state.loading = true;
      state.error = null;
    },
    adressLivraisonSuccess: (state, action) => {
      state.loading = false;
      state.livraison = action.payload;
    },
    adressLivraisonFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const { adressLivraisonRequest, adressLivraisonSuccess, adressLivraisonFailure } = livraisonSlice.actions;
export default livraisonSlice.reducer;

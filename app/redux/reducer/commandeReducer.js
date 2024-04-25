import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  commandes: [],
  loading: false,
  error: null
};

const commandeslice = createSlice({
  name: "commandes",
  initialState,
  reducers: {
    fetchCommandesRequest(state) {
      state.loading = true;
      state.error = null;
    },
    fetchCommandesSucces(state, action) {
      state.loading = false;
      state.commandes = action.payload;
      state.error = null;
    },
    fetchCommandesFailure(state, action) {
      state.loading = false;
      state.error = action.payload;
    },
    addCommandeRequest(state) {
      state.loading = true;
      state.error = null;
    },
    addCommandeSucces(state, action) {
      state.loading = false;
      state.commandes.push(action.payload); // Ajoute la nouvelle commande au tableau des commandes
      state.error = null;
    },
    addCommandeFailure(state, action) {
      state.loading = false;
      state.error = action.payload;
    }
  }
});

export const { 
  fetchCommandesRequest, 
  fetchCommandesSucces, 
  fetchCommandesFailure,
  addCommandeRequest,
  addCommandeSucces,
  addCommandeFailure
} = commandeslice.actions;

export default commandeslice.reducer;


import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  repas: [],
  loading: false,
  error: null
};

const repaslice = createSlice({
  name: "repas",
  initialState,
  reducers: {
    fetchRepasRequest(state) {
      state.loading = true;
    },
    fetchRepassuccess(state, action) {
      state.loading = false;
      state.repas = action.payload;
      state.error = null;
    },
    fetchRepasFailure(state, action) {
      state.loading = false;
      state.error = action.payload;
    }
  }
})
export const { fetchRepasRequest, fetchRepassuccess, fetchRepasFailure } = repaslice.actions;

export default repaslice.reducer;
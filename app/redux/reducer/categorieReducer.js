
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  categories: [],
  loading: false,
  error: null
};

const categorieSlice = createSlice({
  name: "categories",
  initialState,
  reducers: {
    fetchcategorieRequest(state) {
      state.loading = true;
    },
    fetchcategorieSucces(state, action) {
      state.loading = false;
      state.categories = action.payload;
      state.error = null;
    },
    fetchcategorieFailure(state, action) {
      state.loading = false;
      state.error = action.payload;
    },
  }
});

export const {
  fetchcategorieRequest,
  fetchcategorieSucces, 
  fetchcategorieFailure,
 } = categorieSlice.actions;

export default categorieSlice.reducer;
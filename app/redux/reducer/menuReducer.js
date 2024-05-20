import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  menus: [],
  loading: false,
  error: null
};

const menuSlice = createSlice({
  name: "menus",
  initialState,
  reducers: {
    fetchMenusRequest(state) {
      state.loading = true;
    },
    fetchMenusSuccess(state, action) {
      state.loading = false;
      state.menus = action.payload;
      state.error = null;
    },
    fetchMenusFailure(state, action) {
      state.loading = false;
      state.error = action.payload;
    }
  }
});

export const { fetchMenusRequest, fetchMenusSuccess, fetchMenusFailure } = menuSlice.actions;

export default menuSlice.reducer;

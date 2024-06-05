import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  payments: [],
  loading: false,
  error: null
};

const paymentSlice = createSlice({
  name: "payments",
  initialState,
  reducers: {
    addPaymentRequest(state) {
      state.loading = true;
      state.error = null;
    },
    addPaymentSuccess(state, action) {
      state.loading = false;
      state.payments.push(action.payload);
      state.error = null;
    },
    addPaymentFailure(state, action) {
      state.loading = false;
      state.error = action.payload;
    }
  }
});

export const { 
  addPaymentRequest,
  addPaymentSuccess,
  addPaymentFailure
} = paymentSlice.actions;

export default paymentSlice.reducer;

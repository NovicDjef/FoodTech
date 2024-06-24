import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { addSomePayement, getSomePayement } from "../../services/routeApi";
import { 
  addPaymentRequest,
  addPaymentSuccess,
  addPaymentFailure,
  fetchPaymentsRequest,
  fetchPaymentsSuccess,
  fetchPaymentsFailure,
} from "../reducer/payementReducer";

export const addPayment = (paymentData) => { 
  return async (dispatch) => {
    dispatch(addPaymentRequest());
    try {
      const response = await addSomePayement(paymentData);
      console.debug("response :", response.data)
      dispatch(addPaymentSuccess(response.data)); // Passez directement response.data ici
      return response.data; // Retournez response.data pour pouvoir accéder à authorization_url
    } catch (error) {
      dispatch(addPaymentFailure(error.message));
      throw error;
    }
  };
};

export const fetchPaymentStatus = async () => {
  return async (dispatch) => {
    dispatch(fetchPaymentsRequest());
    try {
      const response = await getSomePayement(reference); 
      dispatch(fetchPaymentsSuccess(response.data));
      console.debug("response avant  ", response)
      return response;
    } catch (error) {
      dispatch(fetchPaymentsFailure(error.message));
      throw error
    }
  };
  };
 
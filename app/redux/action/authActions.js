import { createAsyncThunk } from '@reduxjs/toolkit';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { fetchSomePhone, fetchSomeValidateOTP, getchSomeUser } from "../../services/routeApi";
import { setUser, logoutUser, fetchUsersRequest, fetchUsersSuccess, fetchUsersFailure } from '../reducer/authReducer'



export const authenticateUser = createAsyncThunk(
  'auth/authenticateUser',
  async (userData, { rejectWithValue, dispatch }) => {
    try {
      const response = await fetchSomePhone(userData);
      const { id } = response.data;
      const userDataWithId = { ...userData, id };
      await AsyncStorage.setItem('userData', JSON.stringify(userDataWithId));
      dispatch(setUser(response.data));
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const verifyOTP = createAsyncThunk(
  'auth/verifyOTP',
  async (otpCode, { rejectWithValue }) => {
    try {
      const response = await fetchSomeValidateOTP(otpCode);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const fetchUsers = () => {
  return async (dispatch) => {
    dispatch(fetchUsersRequest());
    try {
      const response = await getchSomeUser();
      dispatch(fetchUsersSuccess(response.data));
    } catch (error) {
      dispatch(fetchUsersFailure(error.message));
    }
  };
};

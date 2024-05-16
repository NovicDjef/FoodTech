import { createAsyncThunk } from '@reduxjs/toolkit';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { fetchSomePhone, fetchSomeValidateOTP, getchSomeUser } from "../../services/routeApi";
import { setUser, logoutUser, fetchUsersRequest, fetchUsersSuccess, fetchUsersFailure } from '../reducer/authReducer'



// export const authenticateUser = createAsyncThunk(
//   'auth/authenticateUser',
//   async ({username, phone}, { rejectWithValue, dispatch }) => {
//     try {
//       const response = await fetchSomePhone(username, phone);
//       // await AsyncStorage.setItem('userData', JSON.stringify(response.data));
//       dispatch(setUser(response.data));
//       // console.log("authentification... :", response.data)
//       return response;
//     } catch (error) {
//       return rejectWithValue(error.response.data);
//     }
//   }
// );
export const authenticateUser = createAsyncThunk(
  'auth/authenticateUser',
  async ({username, phone}, { rejectWithValue }) => {
    try {
      const response = await fetchSomePhone({ username, phone });
      await AsyncStorage.setItem('userData', JSON.stringify(response.data));
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const verifyOTP = createAsyncThunk(
  'auth/verifyOTP',
  async (otpData, { rejectWithValue }) => {
    try {
      // Faites votre logique de vérification OTP ici
      const response = await fetchSomeValidateOTP(otpData);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);


// export const fetchUsers = createAsyncThunk(
//   'auth/fetchUsers',
//   async (_, { dispatch }) => {
//     dispatch(fetchUsersRequest());
//     try {
//       const response = await getchSomeUser();
//       console.debug("userID: ", response)
//       const usersWithIds = response.data.map(user => ({ ...user, id: user.id }));
//       dispatch(fetchUsersSuccess(usersWithIds)); 
//       return usersWithIds;
//     } catch (error) {
//       throw error;
//     }
//   }
// );
export const fetchUserData = createAsyncThunk(
  'auth/fetchUserData',
  async (_, { rejectWithValue }) => {
    try {
      const userData = await AsyncStorage.getItem('userData');
      return JSON.parse(userData);
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);


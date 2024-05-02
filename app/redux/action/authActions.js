import { createAsyncThunk } from '@reduxjs/toolkit';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { fetchSomePhone, fetchSomeValidateOTP, getchSomeUser } from "../../services/routeApi";
import { setUser, logoutUser, fetchUsersRequest, fetchUsersSuccess, fetchUsersFailure } from '../reducer/authReducer'



export const authenticateUser = createAsyncThunk(
  'auth/authenticateUser',
  async (userData, { rejectWithValue, dispatch }) => {
    try {
      const response = await fetchSomePhone(userData);
      await AsyncStorage.setItem('userData', JSON.stringify(response.data));
      dispatch(setUser(response.data));
      console.log("edededededed :", response.data)
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

// export const fetchUsers = () => {
//   return async (dispatch) => {
//     dispatch(fetchUsersRequest());
//     try {
//       const response = await getchSomeUser();
//       dispatch(fetchUsersSuccess(response.data));
//     } catch (error) {
//       dispatch(fetchUsersFailure(error.message));
//     }
//   };
// };
export const fetchUsers = createAsyncThunk(
  'auth/fetchUsers',
  async (_, { dispatch }) => {
    dispatch(fetchUsersRequest());
    try {
      const response = await getchSomeUser();
      console.debug("userID: ", response)
      const usersWithIds = response.data.map(user => ({ ...user, id: user.id }));
      dispatch(fetchUsersSuccess(usersWithIds)); 
      return usersWithIds;
    } catch (error) {
      throw error;
    }
  }
);

// export const fetchUsers = createAsyncThunk(
//   'auth/fetchUsers',
//   async (_, { dispatch }) => {
//     dispatch(fetchUsersRequest());
//     try {
//       const response = await getchSomeUser();
//       // Récupérer les utilisateurs de la réponse et stocker leur ID
//       const usersWithIds = response.data.map(user => ({ ...user, id: user.id }));
//       dispatch(fetchUsersSuccess(usersWithIds));
//       return usersWithIds; // Retourner les utilisateurs avec leurs IDs
//     } catch (error) {
//       dispatch(fetchUsersFailure(error.message));
//       throw error; // Renvoyer l'erreur pour la gestion dans le composant
//     }
//   }
// );
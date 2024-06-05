import { createAsyncThunk } from '@reduxjs/toolkit';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { fetchSomePhone, fetchSomeValidateOTP, getchSomeUser, updateSomePhone } from "../../services/routeApi";
import { setUser, logoutUser, fetchUsersRequest, fetchUsersSuccess, fetchUsersFailure } from '../reducer/authReducer';

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
  async (otpCode, { rejectWithValue }) => {
    try {
      // Faites votre logique de vérification OTP ici
      const response = await fetchSomeValidateOTP(otpCode);
      return response.data;
    } catch (error) {
      if (error.response) {
        return rejectWithValue(error.response.data);
      } else {
        // Gérer d'autres types d'erreurs ici si nécessaire
        return rejectWithValue({ message: 'Une erreur s\'est produite lors de la vérification de l\'OTP.' });
      }
    }
  }
);

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

// Ajout de l'action pour modifier un utilisateur
export const updateUser = createAsyncThunk(
  'auth/updateUser',
  async ({ id, username, phone }, { rejectWithValue }) => {
    try {
      const response = await updateSomePhone(id, { username, phone });
      await AsyncStorage.setItem('userData', JSON.stringify(response.data)); // Mettez à jour les données utilisateur dans AsyncStorage
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

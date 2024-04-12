import { fetchSomePhone } from "../../services/routeApi";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const addUserAndOTPRequest = () => ({
  type: 'ADD_USER_AND_OTP_REQUEST'
});

export const addUserAndOTPSuccess = (data) => ({
  type: 'ADD_USER_AND_OTP_SUCCESS',
  payload: data
});

export const addUserAndOTPFailure = (error) => ({
  type: 'ADD_USER_AND_OTP_FAILURE',
  payload: error
});

export const addUserAndOTP = (userData) => {
  return async (dispatch) => {
    try {
      dispatch(addUserAndOTPRequest());
      const response = await fetchSomePhone(userData);
      dispatch(addUserAndOTPSuccess(response.data));
      await AsyncStorage.setItem('userData', JSON.stringify(response.data.user));
      return response.data; // Retourner les données utilisateur
    } catch (error) {
      dispatch(addUserAndOTPFailure(error.message));
    }
  };
};

export const checkUserLoggedIn = () => {
  return async (dispatch) => {
    try {
      // Vérifier si des informations de connexion sont disponibles dans AsyncStorage
      const userDataString = await AsyncStorage.getItem('userData');

      if (userDataString !== null) {
        const userData = JSON.parse(userDataString);
        // Dispatch une action pour connecter automatiquement l'utilisateur
        dispatch(addUserAndOTPSuccess(userData));
      }
    } catch (error) {
      console.error('Error checking user login status:', error);
    }
  };
};

export const logoutUser = () => {
  return async (dispatch) => {
    try {
      // Supprimer les informations de connexion de l'utilisateur d'AsyncStorage lors de la déconnexion
      await AsyncStorage.removeItem('userData');
      // Dispatch une action pour déconnecter l'utilisateur
      dispatch({ type: 'LOGOUT_USER' });
    } catch (error) {
      console.error('Error logging out user:', error);
    }
  };
};
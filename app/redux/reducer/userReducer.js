import AsyncStorage from "@react-native-async-storage/async-storage";
import { addUserAndOTPSuccess } from "../action/userAction";

const initialState = {
  loading: false,
  user: null,
  error: null,
};

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'ADD_USER_AND_OTP_REQUEST':
      return {
        ...state,
        loading: true,
        error: null
      };
    case 'ADD_USER_AND_OTP_SUCCESS':
      return {
        ...state,
        loading: false,
        user: action.payload,
        error: null,
      };
    case 'ADD_USER_AND_OTP_FAILURE':
      return {
        ...state,
        loading: false,
        user: null,
        error: action.payload
      };
    case 'LOGOUT_USER':
      return {
        ...state,
        user: null,
        error: null
      };
    default:
      return state;
  }
};

// Récupérer les données utilisateur à partir d'AsyncStorage au démarrage de l'application
export const loadUserDataFromStorage = () => {
  return async (dispatch) => {
    try {
      const userData = await AsyncStorage.getItem('userData');
      if (userData) {
        dispatch(addUserAndOTPSuccess(JSON.parse(userData)));
      }
    } catch (error) {
      console.error('Error loading user data from AsyncStorage:', error);
    }
  };
};

export default userReducer;

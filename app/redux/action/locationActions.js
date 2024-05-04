import { getchSomeGeolocation, fetchSomeGeolocation } from '../../services/routeApi';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { fetchGeolocationRequest, fetchGeolocationSuccess, fetchGeolocationFailure } from "../reducer/locationReducer";

export const getchGeolocations = () => {
  return async (dispatch) => {
    dispatch(fetchGeolocationRequest());
    try {
      const response = await getchSomeGeolocation();
      console.log("response :", response.data)
      dispatch(fetchGeolocationSuccess(response.data));
    } catch (error) {
      dispatch(fetchGeolocationFailure(error.message));
    }
  };
};

// export const getchGeolocations = createAsyncThunk(
//   'location/fetchGeolocation',
//   async (_, { rejectWithValue }) => {
//     try {
//       const response = await getchSomeGeolocation(); 
//       console.warn("dsdsdsdvdd :", response.data)
//       return response.data; 
//     } catch (error) {
//       return rejectWithValue(error.response.data);
//     }
//   }
// );

export const postGeolocation = createAsyncThunk(
  'location/postGeolocation',
  async (geolocationData, { rejectWithValue }) => {
    try {
      const response = await fetchSomeGeolocation(geolocationData); // Utilisez la fonction d'API appropriée
      return response.data; // Supposons que la réponse de l'API contient les données de géolocalisation postées
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);
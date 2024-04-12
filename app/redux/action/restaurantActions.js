import { fetchSomeRestaurant } from '../../services/routeApi'; // Importer la fonction pour récupérer les restaurants depuis votre API
import { FETCH_RESTAURANT_REQUEST, FETCH_RESTAURANT_SUCCESS, FETCH_RESTAURANT_FAILURE } from '../types/RestaurantType';


export const fetchRestaurantRequest = () => ({
  type: FETCH_RESTAURANT_REQUEST,
});

export const fetchRestaurantSuccess = (restaurants) => ({
  type: FETCH_RESTAURANT_SUCCESS,
  payload: restaurants,
});

export const fetchRestaurantFailure = (error) => ({
  type: FETCH_RESTAURANT_FAILURE,
  error: error,
});

export const fetchRestaurant = () => {
  return async (dispatch) => {
    dispatch(fetchRestaurantRequest());
    try {
      console.log("response avannt l':")
      const response = await fetchSomeRestaurant(); 
      console.log("response :", response)// Appel à votre fonction pour récupérer les restaurants depuis votre API
      dispatch(fetchRestaurantSuccess(response.data));
    } catch (error) {
      dispatch(fetchRestaurantFailure(error.message));
    }
  };
};

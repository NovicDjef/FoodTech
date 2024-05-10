import { getchSomeRestaurant } from "../../services/routeApi";
import { fetchrestaurantRequest, fetchrestaurantSucces, fetchrestaurantFailure } from "../reducer/restaurantReducer"



export const fetchRestaurants = () => {
  return async (dispatch) => {
    dispatch(fetchrestaurantRequest());
    try {
      const response = await getchSomeRestaurant();
      dispatch(fetchrestaurantSucces(response.data));
      return response;
    } catch (error) {
      dispatch(fetchrestaurantFailure(error.message));
      throw error
    }
  };
};




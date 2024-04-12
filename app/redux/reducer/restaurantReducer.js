import { FETCH_RESTAURANT_REQUEST, FETCH_RESTAURANT_SUCCESS, FETCH_RESTAURANT_FAILURE } from "../types/RestaurantType";


const initialState = {
  isLoading: false,
  restaurantData: [],
  error: '',
};

export default (state = initialState, action) => {
  switch (action.type) {
    case FETCH_RESTAURANT_REQUEST:
      return {
        ...state,
        isLoading: true,
      };
    case FETCH_RESTAURANT_SUCCESS:
      return {
        isLoading: false,
        restaurantData: action.payload,
        error: '',
      };
    case FETCH_RESTAURANT_FAILURE:
      return {
        isLoading: false,
        restaurantData: [],
        error: action.error,
      };
    default:
      return state;
  }
};


import { getchSomeslide } from "../../services/routeApi";
import { fetchslideRequest, fetchslideSucces, fetchslideFailure } from "../reducer/slideReducer"



export const fetchSlides = () => {
  return async (dispatch) => {
    dispatch(fetchslideRequest());
    try {
      const response = await getchSomeslide();
      dispatch(fetchslideSucces(response.data));
    } catch (error) {
      dispatch(fetchslideFailure(error.message));
    }
  };
};




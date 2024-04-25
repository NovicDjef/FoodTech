import { getchSomecategorie } from "../../services/routeApi";
import { fetchcategorieRequest, fetchcategorieSucces, fetchcategorieFailure } from "../reducer/categorieReducer"



export const fetchCategories = () => {
  return async (dispatch) => {
    dispatch(fetchcategorieRequest());
    try {
      const response = await getchSomecategorie();
      dispatch(fetchcategorieSucces(response.data));
    } catch (error) {
      dispatch(fetchcategorieFailure(error.message));
    }
  };
};




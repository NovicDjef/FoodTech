import { getchSomeVille } from '../../services/routeApi';
import { VilleRequest, VilleSuccess, VilleFailure } from "../reducer/villesReducer";

export const fetchVilles = () => {
  return async (dispatch) => {
    dispatch(VilleRequest());
    try {
      const response = await getchSomeVille();
      dispatch(VilleSuccess(response.data));
      return response
    } catch (error) {
      dispatch(VilleFailure(error.message));
      throw error;
    }
  };
};


import { getchSomeLivraisons } from '../../services/routeApi';
import { adressLivraisonRequest, adressLivraisonSuccess, adressLivraisonFailure } from "../reducer/livraisonReducer";

export const fetchLivraisons = () => {
  return async (dispatch) => {
    dispatch(adressLivraisonRequest());
    try {
      const response = await getchSomeLivraisons();
      dispatch(adressLivraisonSuccess(response.data));
    } catch (error) {
      dispatch(adressLivraisonFailure(error.message));
    }
  };
};


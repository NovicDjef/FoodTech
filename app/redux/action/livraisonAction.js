import { fetchSomeAdressLivraison } from "../../services/routeApi"

export const sendAdressLivraison = (adresse) => {
  return async (dispatch) => {
    try {
      dispatch(adressLivraisonRequest());
      const response = await fetchSomeAdressLivraison(adresse);
      dispatch(adressLivraisonSuccess(response.data));
    } catch (error) {
      dispatch(adressLivraisonFailure(error.message));
    }
  };
};

const adressLivraisonRequest = () => ({
  type: 'ADRESS_LIVRAISON_REQUEST'
});

const adressLivraisonSuccess = (data) => ({
  type: 'ADRESS_LIVRAISON_SUCCESS',
  payload: data,
});

const adressLivraisonFailure = (error) => ({
  type: 'ADRESS_LIVRAISON_FAILURE',
  payload: error,
});

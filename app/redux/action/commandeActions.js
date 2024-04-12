import { fetchSomeCommande, getSomeCommande } from "../../services/routeApi"


export const sendCommande = (cart, userId) => {
  return async (dispatch) => {
    try {
      dispatch(envoyerCommandeRequest());
      const response = await fetchSomeCommande(cart.items, userId);
      console.log("response: " + response)
      dispatch(envoyerCommandeSuccess(response.data));
    } catch (error) {
      dispatch(envoyerCommandeFailure(error.message));
    }
  };
};

// get
export const getAllCommande = (userId) => {
  return async (dispatch) => {
    try {
      dispatch(envoyerCommandeRequest());
      console.warn("commande: ", commande)
      const response = await getSomeCommande(userId);
      console.warn("commande: ", response)
      dispatch(envoyerCommandeSuccess(response.data));
    } catch (error) {
      dispatch(envoyerCommandeFailure(error.message));
    }
  };
};

const envoyerCommandeRequest = () => ({
  type: 'ENVOYER_COMMANDE_REQUEST'
});

const envoyerCommandeSuccess = (data) => ({
  type: 'ENVOYER_COMMANDE_SUCCESS',
  payload: data,
});

const envoyerCommandeFailure = (error) => ({
  type: 'ENVOYER_COMMANDE_FAILURE',
  payload: error,
});

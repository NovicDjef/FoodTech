import { addSomeCommande, getSomeCommande } from "../../services/routeApi";
import { 
  fetchCommandesRequest, 
  fetchCommandesSucces, 
  fetchCommandesFailure,
  addCommandeRequest,
  addCommandeSucces,
  addCommandeFailure
} from "../reducer/commandeReducer";

// Fetch commandes
export const fetchcommandes = () => {
  return async (dispatch) => {
    dispatch(fetchCommandesRequest());
    try {
      const response = await getSomeCommande();
      dispatch(fetchCommandesSucces(response.data));
      return response; 
    } catch (error) {
      dispatch(fetchCommandesFailure(error.message));
      throw error;
    }
  };
};

// Add commande
export const addCommande = (payement) => { 
  return async (dispatch) => {
    dispatch(addCommandeRequest());
    try {
      const response = await addSomeCommande(payement);
      console.log("Réponse :", response);
      dispatch(addCommandeSucces(response.data));
      console.log("Réponse :", response);
      return response; 
    } catch (error) {
      dispatch(addCommandeFailure(error.message));
      throw error;
    }
  };
};

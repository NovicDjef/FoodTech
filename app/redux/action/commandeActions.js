import { addSomeCommande, getSomeCommande } from "../../services/routeApi"; // Mettez à jour pour correspondre à votre service d'API
import { 
  fetchCommandesRequest, 
  fetchCommandesSucces, 
  fetchCommandesFailure,
  addCommandeRequest,
  addCommandeSucces,
  addCommandeFailure
} from "../reducer/commandeReducer";

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

export const addCommande = (cart) => { 
  return async (dispatch) => {
    dispatch(addCommandeRequest());
    try {
      const response = await addSomeCommande(cart);
      dispatch(addCommandeSucces(response.data));
      return response; 
    } catch (error) {
      dispatch(addCommandeFailure(error.message));
      throw error;
    }
  };
};

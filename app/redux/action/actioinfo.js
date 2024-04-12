import { addUserAndOTP } from './userAction';
import { fetchSomePhone } from "../../services/routeApi" // Exemple d'action pour récupérer des données depuis une API
import { getState } from 'redux-thunk';

export const fetchDataAndUpdateUser = () => {
  return async (dispatch) => {
    try {
      // Récupérer les informations de l'utilisateur depuis le store Redux
      const userData = getState().user.userData;
        console.warn("ddefeffe: ", userData);
      // Utiliser les informations de l'utilisateur dans une action pour récupérer des données depuis une API
      const response = await fetchSomePhone(userData);

      // Mettre à jour le store Redux avec les données récupérées si nécessaire
      dispatch(addUserAndOTP(response.userData));
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };
};

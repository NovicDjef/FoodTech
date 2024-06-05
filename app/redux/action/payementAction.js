import { addSomePayement } from "../../services/routeApi";
import { 
  addPaymentRequest,
  addPaymentSuccess,
  addPaymentFailure
} from "../reducer/payementReducer";

export const addPayment = (paymentData) => { 
  return async (dispatch) => {
    dispatch(addPaymentRequest());
    try {
      const response = await addSomePayement(paymentData);
      console.debug("response :", response.data)
      dispatch(addPaymentSuccess(response.data)); // Passez directement response.data ici
      return response.data; // Retournez response.data pour pouvoir accéder à authorization_url
    } catch (error) {
      dispatch(addPaymentFailure(error.message));
      throw error;
    }
  };
};

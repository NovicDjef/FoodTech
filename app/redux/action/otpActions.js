import { fetchSomeValidateOTP } from "../../services/routeApi";


export const VERIFY_OTP_REQUEST = 'VERIFY_OTP_REQUEST';
export const VERIFY_OTP_SUCCESS = 'VERIFY_OTP_SUCCESS';
export const VERIFY_OTP_FAILURE = 'VERIFY_OTP_FAILURE';

export const verifyOTPRequest = () => ({
  type: VERIFY_OTP_REQUEST,
});

export const verifyOTPSuccess = () => ({
  type: VERIFY_OTP_SUCCESS,
});

export const verifyOTPFailure = (error) => ({
  type: VERIFY_OTP_FAILURE,
  payload: error,
});

export const verifyOTP = (otpCode) => {
  return async (dispatch) => {
    dispatch(verifyOTPRequest());
    try {
      // Envoyer l'OTP au backend pour vérification
      const response = await fetchSomeValidateOTP(otpCode); // Utilisez votre méthode pour envoyer l'OTP
      const data = await response.json();

      if (response) {
        dispatch(verifyOTPSuccess());
      } else {
        dispatch(verifyOTPFailure(data.message));
      }
    } catch (error) {
      dispatch(verifyOTPFailure(error.message));
    }
  };
};

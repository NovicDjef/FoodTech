
export const VERIFY_OTP_REQUEST = 'VERIFY_OTP_REQUEST';
export const VERIFY_OTP_SUCCESS = 'VERIFY_OTP_SUCCESS';
export const VERIFY_OTP_FAILURE = 'VERIFY_OTP_FAILURE';

const initialState = {
  loading: false,
  error: null,
};

const otpReducer = (state = initialState, action) => {
  switch (action.type) {
    case VERIFY_OTP_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case VERIFY_OTP_SUCCESS:
      return {
        ...state,
        loading: false,
      };
    case VERIFY_OTP_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

export default otpReducer;

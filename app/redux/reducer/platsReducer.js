import { FETCH_PLATS_REQUEST, FETCH_PLATS_SUCCESS, FETCH_PLATS_FAILURE } from "../types/platsType"


const initialState = {
  isLoading: false,
  platsData: [],
  error: '',
};

export default platsReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_PLATS_REQUEST:
      return {
        ...state,
        isLoading: true,
      };
    case FETCH_PLATS_SUCCESS:
      return {
        isLoading: false,
        platsData: action.payload,
        error: '',
      };
    case FETCH_PLATS_FAILURE:
      return {
        isLoading: false,
        platsData: [],
        error: action.error,
      };
    default:
      return state;
  }
};


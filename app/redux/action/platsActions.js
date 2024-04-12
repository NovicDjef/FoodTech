import { FETCH_PLATS_REQUEST, FETCH_PLATS_SUCCESS, FETCH_PLATS_FAILURE } from "../types/platsType"

import { fetchSomePlats } from '../../services/routeApi'; 


export const fetchPlatsRequest = () => ({
  type: FETCH_PLATS_REQUEST,
});

export const fetchPlatsSuccess = (plats) => ({
  type: FETCH_PLATS_SUCCESS,
  payload: plats,
});

export const fetchPlatsFailure = (error) => ({
  type: FETCH_PLATS_FAILURE,
  error: error,
});

export const fetchPlats = () => {
  return async (dispatch) => {
    dispatch(fetchPlatsRequest());
    try {
      const response = await fetchSomePlats(); 
      dispatch(fetchPlatsSuccess(response.data));
    } catch (error) {
      dispatch(fetchPlatsFailure(error.message));
    }
  };
};



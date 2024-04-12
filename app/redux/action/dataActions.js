// actions/dataActions.js

import { fetchSomeCategory, fetchSomeGames, fetchSomeNotifications, fetchSomeLots, fetchSomeVilles, fetchSomePlats } from '../../services/routeApi';
import { FETCH_DATA_FAILURE, FETCH_DATA_REQUEST, FETCH_DATA_SUCCESS, FETCH_LOT_REQUEST, FETCH_LOT_SUCCESS, FETCH_LOT_FAILURE } from '../types/RestaurantType';

export const fetchRestaurant = () => {
  return async (dispatch) => {
    dispatch({ 
      type: "FETCH_DATA_REQUEST" 
    });
    try {
      const response = await fetchSomeRestaurant();
      dispatch({ 
        type: "FETCH_DATA_SUCCESS", 
        payload: response.data 
      });
    } catch (error) {
      dispatch({ 
        type: "FETCH_DATA_FAILURE", 
        error: error.message 
      });
    }
  };
};
export const fetchPlats = (listLot) => {
  return async (dispatch) => {
    dispatch({ 
      type: FETCH_LOT_REQUEST 
    });
    try {
      const response = await fetchSomePlats(listLot);
      dispatch({ 
        type: FETCH_LOT_SUCCESS, 
        payload: response.data 
      });
    } catch (error) {
      dispatch({ 
        type: FETCH_LOT_FAILURE, 
        error: error.message 
      });
    }
  };
};

export const fetchGames = () => {
  return async (dispatch) => {
    dispatch({ type: FETCH_DATA_REQUEST });
    try {
      const response = await fetchSomeGames();
      dispatch({ 
        type: FETCH_DATA_SUCCESS, 
        payload: response.data 
      });
    } catch (error) {
      dispatch({ 
        type: FETCH_DATA_FAILURE, 
        error: error.message 
      });
    }
  };
};

export const fetchVilles = () => {
  return async (dispatch) => {
    dispatch({ type: 'DATA_VILLE' });
    try {
      const response = await fetchSomeVilles();
      dispatch({ 
        type: 'DATA_VILLE_SUCCESS', 
        payload: response.data 
      });
    } catch (error) {
      dispatch({ 
        type: 'DATA_VILLE_ECHEC', 
        error: error.message 
      });
    }
  };
};
export const fetchNotifications = () => {
  return async (dispatch) => {
    dispatch({ 
      type: FETCH_DATA_REQUEST 
    });
    try {
      const response = await fetchSomeNotifications();
      dispatch({ 
        type: FETCH_DATA_SUCCESS, 
        payload: response.data 
      });
    } catch (error) {
      dispatch({ 
        type: FETCH_DATA_FAILURE, 
        error: error.message 
      });
    }
  };
};

export const rechargeWallet = (userId, rechargeAmount) => {
  return {
    type: 'RECHARGE_WALLET',
    payload: { userId, rechargeAmount },
  };
};


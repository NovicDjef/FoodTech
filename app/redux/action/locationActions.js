import { fetchSomeGeolocation } from "../../services/routeApi";

export const sendLocation = (latitude, longitude) => {
    return async (dispatch) => {
      try {
        await fetchSomeGeolocation(latitude, longitude);
        dispatch({
          type: 'SEND_LOCATION',
          payload: { latitude, longitude },
        });
      } catch (error) {
        console.error('Error sending location:', error);
      }
    };
  };


const initialState = {
    latitude: null,
    longitude: null,
  };
  
  const locationReducer = (state = initialState, action) => {
    switch (action.type) {
      case 'SEND_LOCATION':
        return {
          ...state,
          latitude: action.payload.latitude,
          longitude: action.payload.longitude,
        };
      default:
        return state;
    }
  };
  
  export default locationReducer;
  
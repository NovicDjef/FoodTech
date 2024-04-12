const initialState = {
    loading: false,
    error: null,
    adresse: null,
  };
    
  const livraisonReducer = (state = initialState, action) => {
    switch (action.type) {
      case 'ADRESS_LIVRAISON_REQUEST':
        return {
          ...state,
          loading: true,
          error: null,
        };
      case 'ADRESS_LIVRAISON_SUCCESS':
        return {
          ...state,
          loading: false,
          adresse: action.payload,
        };
      case 'ADRESS_LIVRAISON_FAILURE':
        return {
          ...state,
          loading: false,
          error: action.payload,
        };
      default:
        return state;
    }
  };
    
  export default livraisonReducer;
  
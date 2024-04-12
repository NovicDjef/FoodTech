const initialState = {
  loading: false,
  error: null,
  commande: [],
};
  
const commandeReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'ENVOYER_COMMANDE_REQUEST':
      return {
        ...state,
        loading: true,
        error: null,
      };
    case 'ENVOYER_COMMANDE_SUCCESS':
      return {
        ...state,
        loading: false,
        commande: action.payload,
      };
    case 'ENVOYER_COMMANDE_FAILURE':
      return {
        ...state,
        loading: false,
        error: action.payload,
        
      };
    default:
      return state;
  }
};
  
export default commandeReducer;

 
// import { createStore, combineReducers, applyMiddleware } from 'redux';
// import restaurantReducer from './reducer/restaurantReducer';
// import platsReducer from './reducer/platsReducer';
// import cartReducer from './reducer/cartReducer';
// import locationReducer from './reducer/locationReducer';
// import userReducer from './reducer/userReducer';
// import commandeReducer from './reducer/commandeReducer';
// import livraisonReducer from "./reducer/livraisonReducer"
// import otpReducer from './reducer/otpReducer';
// import thunk from 'redux-thunk';


// const rootReducer = combineReducers({
//   restaurantReducer,
//   platsReducer,
//   cartReducer,
//   locationReducer,
//   userReducer,
//   commandeReducer,
//   livraisonReducer,
//   otpReducer


// })

// const store = createStore(rootReducer, applyMiddleware(thunk));

// export default store;

import { configureStore } from '@reduxjs/toolkit';
import authReducer from './reducer/authReducer';
import restaurantReducer from './reducer/restaurantReducer';
import platsReducer from './reducer/platsReducer';
import cartReducer from './reducer/cartReducer';
import slideReducer from './reducer/slideReducer';
import categorieReducer from './reducer/categorieReducer';
import commandeReducer from './reducer/commandeReducer';
import livraisonReducer from './reducer/livraisonReducer';
import favoriteReducer from './reducer/favoriteReducer';
import locationReducer from './reducer/locationReducer';

const store = configureStore({
  reducer: {
    auth: authReducer,
    restaurant: restaurantReducer,
    plat: platsReducer,
    cart: cartReducer,
    slide: slideReducer,
    categorie: categorieReducer,
    commande: commandeReducer,
    livraison: livraisonReducer,
    favorite: favoriteReducer,
    location: locationReducer, 
  },
});

export default store;


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
import villesReducer from './reducer/villesReducer';
import favorisReducer from './reducer/favorisReducer';
import menuReducer from './reducer/menuReducer';
import payementReducer from './reducer/payementReducer';

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
    ville: villesReducer,
    favoris: favorisReducer,
    menu: menuReducer,
    payement : payementReducer
  },
});

export default store;

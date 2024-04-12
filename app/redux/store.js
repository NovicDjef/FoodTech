 
import { createStore, combineReducers, applyMiddleware } from 'redux';
import restaurantReducer from './reducer/restaurantReducer';
import platsReducer from './reducer/platsReducer';
import cartReducer from './reducer/cartReducer';
import locationReducer from './reducer/locationReducer';
import userReducer from './reducer/userReducer';
import commandeReducer from './reducer/commandeReducer';
import livraisonReducer from "./reducer/livraisonReducer"
import otpReducer from './reducer/otpReducer';
import thunk from 'redux-thunk';


const rootReducer = combineReducers({
  restaurantReducer,
  platsReducer,
  cartReducer,
  locationReducer,
  userReducer,
  commandeReducer,
  livraisonReducer,
  otpReducer


})

const store = createStore(rootReducer, applyMiddleware(thunk));

export default store;


// Sotre de   Cagagne : 


// import { configureStore, combineReducers } from '@reduxjs/toolkit';
// import loginReducer from './reducer/loginReducer';
// import walletReducer from './reducer/walletReducer';
// import { persistStore, persistReducer } from 'redux-persist';
// import AsyncStorage from '@react-native-async-storage/async-storage';
// import thunk from 'redux-thunk';
// import CategoryReducer from './reducer/categoryReducer';
// import notificationsReducer from './reducer/notificationReducer';
// import LotReducer from './reducer/LotReducer';
// import authReducer from './reducer/authReducer';
// import villeReducer from './reducer/villeReducer';

// const authPersistConfig = {
//   key: 'authReducer',
//   storage: AsyncStorage,
//   whitelist: ['authToken'],
// };

// const persistedAuthReducer = persistReducer(authPersistConfig, authReducer);

// const rootReducer = combineReducers({
//   loginReducer,
//   walletReducer,
//   authReducer: persistedAuthReducer,
//   categoryReducer: CategoryReducer,
//   notificationsReducer,
//   lotReducer: LotReducer,
//   villeReducer: villeReducer,
// });

// const store = configureStore({
//   reducer: rootReducer,
//   middleware: (getDefaultMiddleware) =>
//     getDefaultMiddleware({
//       thunk: {
//         extraArgument: { /* add any extra argument if needed */ },
//       },
//     }),
// });

// const persistor = persistStore(store);

// export { store, persistor };


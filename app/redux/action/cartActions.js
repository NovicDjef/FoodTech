
import { ADD_TO_CART, REMOVE_FROM_CART, UPDATE_CART_ITEM_QUANTITY } from "../types/cartsType";

export const addToCart = (plat) => ({
  type: ADD_TO_CART,
  payload: plat,
});

export const removeFromCart = (id) => ({
  type: REMOVE_FROM_CART,
  payload: id,
});

export const updateCartItemQuantity = (id, quantity) => ({
  type: UPDATE_CART_ITEM_QUANTITY,
  payload: { id, quantity },
});

// import { createSlice } from '@reduxjs/toolkit';

// const cartSlice = createSlice({
//   name: 'cart',
//   initialState: {
//     items: [],
//   },
//   reducers: {
//     addToCart: (state, action) => {
//       state.items.push(action.payload);
//     },
//     removeFromCart: (state, action) => {
//       state.items = state.items.filter(item => item.id !== action.payload);
//     },
//     updateCartItemQuantity: (state, action) => {
//       const { id, quantity } = action.payload;
//       const itemIndex = state.items.findIndex(item => item.id === id);
//       if (itemIndex !== -1) {
//         state.items[itemIndex].quantity = quantity;
//       }
//     },
//   },
// });

// export const { addToCart, removeFromCart, updateCartItemQuantity } = cartSlice.actions;
// export default cartSlice.reducer;


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

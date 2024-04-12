
import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { removeFromCart, updateCartItemQuantity } from '../redux/action/cartActions';

const Cart = () => {
  const cart = useSelector(state => state.cartReducer);
  const dispatch = useDispatch();

  const handleRemoveFromCart = (id) => {
    dispatch(removeFromCart(id));
  };

  const handleUpdateCartItemQuantity = (id, quantity) => {
    dispatch(updateCartItemQuantity(id, quantity));
  };
  
console.warn("cart :", cart)
  

  return (
    <View>
      {cart.items.map(item => (
        <View key={item.id}>
          <Text>{item.nom_plat}</Text>
          <Text>{item.prix_plat}</Text>
          <Text>{item.quantity}</Text>
          <TouchableOpacity onPress={() => handleUpdateCartItemQuantity(item.id, item.quantity - 1)}>
            <Text>-</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => handleUpdateCartItemQuantity(item.id, item.quantity + 1)}>
            <Text>+</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => handleRemoveFromCart(item.id)}>
            <Text>Supprimer</Text>
          </TouchableOpacity>
        </View>
      ))}
    </View>
  );
};

export default Cart;

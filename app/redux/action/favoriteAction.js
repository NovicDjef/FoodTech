import { useSelector } from 'react-redux';
import { addFavorite, removeFavorite } from '../reducer/favoriteReducer'



export const toggleFavorite = (restaurant) => (dispatch, getState) => {
  const { favorites } = getState();
  const isFavorite = favorites.restaurants.some((r) => r.id === restaurant.id);

  if (isFavorite) {
    dispatch(removeFavorite(restaurant));
  } else {
    dispatch(addFavorite(restaurant));
  }
};

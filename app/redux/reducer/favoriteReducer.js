import { createSlice } from '@reduxjs/toolkit';

const favoritesSlice = createSlice({
  name: 'favorites',
  initialState: {
    restaurants: [],
  },
  reducers: {
    addFavorite: (state, action) => {
      state.restaurants.push(action.payload);
    },
    removeFavorite: (state, action) => {
      state.restaurants = state.restaurants.filter(restaurant => restaurant.id !== action.payload.id);
    },
  },
});

export const { addFavorite, removeFavorite } = favoritesSlice.actions;
export default favoritesSlice.reducer;

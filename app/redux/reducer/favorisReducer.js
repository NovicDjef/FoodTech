import { createSlice } from '@reduxjs/toolkit';

const favorisSlice = createSlice({
  name: 'favoris',
  initialState: [],
  reducers: {
    ajoutFavoris(state, action) {
      state.push(action.payload);
    },
    suppressionFavoris(state, action) {
      return state.filter(item => item.id !== action.payload.id);
    },
  },
});

export const { ajoutFavoris, suppressionFavoris } = favorisSlice.actions;
export default favorisSlice.reducer;

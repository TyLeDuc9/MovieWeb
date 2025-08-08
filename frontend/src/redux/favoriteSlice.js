import { createSlice } from '@reduxjs/toolkit';

const favoriteSlice = createSlice({
  name: 'favorite',
  initialState: {
    items: [],
    error: null,
    loading: false,
  },
  reducers: {
    fetchFavoriteStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    fetchFavoriteSuccess: (state, action) => {
      state.items = action.payload;
      state.loading = false;
    },
    addFavoriteSuccess: (state, action) => {
      state.items.push(action.payload);
      state.loading = false;
    },
    removeFavoriteSuccess: (state, action) => {
      const { type, id } = action.payload;
      state.items = state.items.filter((item) => {
        if (type === 'movie') return item.tmdbMovieId !== id;
        if (type === 'director') return item.tmdbDirectorId !== id;
        return true;
      });
      state.loading = false;
    },
    fetchFavoriteFailed: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const {
  fetchFavoriteStart,
  fetchFavoriteSuccess,
  addFavoriteSuccess,
  removeFavoriteSuccess,
  fetchFavoriteFailed,
} = favoriteSlice.actions;

export default favoriteSlice.reducer;

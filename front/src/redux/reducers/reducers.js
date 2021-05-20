import { createSlice } from '@reduxjs/toolkit';

const likesSlice = createSlice({
  name: 'likes',
  initialState: {
    likes: [],
  },
  reducers: {
    loadLikesList: (state, action) => {
      state.likes = action.payload;
    },
    clearLikes: state => {
      state.likes = [];
    },
    setLikeOnTopic: (state, action) => {
      state.likes = [...state.likes, action.payload];
    },
    removeLikeFromTopic: (state, action) => {
      state.likes = state.likes.filter(item => item.id !== action.payload);
    },
    openSoket: state => state,
  },
});

export const {
  loadLikesList,
  clearLikes,
  setLikeOnTopic,
  removeLikeFromTopic,
  openSoket,
} = likesSlice.actions;
export default likesSlice.reducer;

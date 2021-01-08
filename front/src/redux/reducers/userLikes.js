import { createSlice } from "@reduxjs/toolkit";

const likesSlice = createSlice({
  name: "likes",
  initialState: {
    likes: [],
  },
  reducers: {
    loadLikesList: (state, action) => {
      state.likes = action.payload;
    },
    clearLikes: (state) => {
      state.likes = [];
    },
  },
});

export const { loadLikesList, clearLikes } = likesSlice.actions;
export default likesSlice.reducer;

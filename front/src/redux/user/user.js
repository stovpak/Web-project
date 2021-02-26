import { createSlice } from '@reduxjs/toolkit';

const user = createSlice({
  name: 'user',
  initialState: { isAuth: null, username: null, email: null },
  reducers: {
    authorisation: (state, action) => {
      state.isAuth = true;
      state.username = action.payload;
    },
    logOut: (state, action) => {
      state.isAuth = false;
    },
  },
});

export const { authorisation, logOut } = user.actions;
export default user.reducer;

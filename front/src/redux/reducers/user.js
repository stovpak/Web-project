import { createSlice } from "@reduxjs/toolkit";
const isAuth = createSlice({
  name: "isAuth",
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

export const { authorisation, logOut } = isAuth.actions;
export default isAuth.reducer;

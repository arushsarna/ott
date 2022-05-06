import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  loginStatus: false,
};

export const loginStatusSlice = createSlice({
  name: "loginStatus",
  initialState,
  reducers: {
    login: (state) => {
      state.loginStatus = true;
    },
    logout: (state) => {
      state.loginStatus = false;
    },
  },
});
export const { login, logout } = loginStatusSlice.actions;
export default loginStatusSlice.reducer;

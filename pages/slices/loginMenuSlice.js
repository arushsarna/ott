import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  loginMenu: " hidden absolute left-1/4 top-1/4 bg-white h-1/2 w-1/2  ",
};

export const loginMenuSlice = createSlice({
  name: "loginMenu",
  initialState,
  reducers: {
    yesLogin: (state) => {
      state.loginMenu = " absolute left-1/4 top-1/4 bg-white h-1/2 w-1/2  ";
    },
    noLogin: (state) => {
      state.loginMenu =
        " hidden absolute left-1/4 top-1/4 bg-white h-1/2 w-1/2  ";
    },
  },
});
export const { yesLogin, noLogin } = loginMenuSlice.actions;
export default loginMenuSlice.reducer;

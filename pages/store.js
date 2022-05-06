import { configureStore } from "@reduxjs/toolkit";
import loginStatusReducer from "./slices/loginStatusSlice";
import loginMenuSlice from "./slices/loginMenuSlice";
export const store = configureStore({
  reducer: { loginMenu: loginMenuSlice, loginStatus: loginStatusReducer },
});

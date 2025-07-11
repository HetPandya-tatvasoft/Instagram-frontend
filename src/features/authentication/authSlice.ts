
import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { User } from "./types/auth.type";
import Cookies from "js-cookie";

interface AuthState {
  user: User | null;
  isInitialised : boolean;
}

const initialState : AuthState = {
  user: null,
  isInitialised : false,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<User | null>) => {
      state.user = action.payload;
      state.isInitialised = true;
    },
    logout: (state) => {
      state.user = null;
      Cookies.remove("auth_token");
      state.isInitialised = true;
    },
    setInitialised : (state) => {
      state.isInitialised = true;
    }
  },
});

export const { setUser, logout, setInitialised } = authSlice.actions;
export default authSlice.reducer;

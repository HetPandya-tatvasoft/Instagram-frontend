
import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { IUser } from "../types/auth.type";
import { removeAuthToken } from "../../../utils/cookie.utils"

interface IAuthState {
  user: IUser | null;
  isInitialised : boolean;
  isAuthenticated : boolean;
}

const initialState : IAuthState = {
  user: null,
  isInitialised : false,
  isAuthenticated : false,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<IUser | null>) => {
      state.user = action.payload;
      state.isInitialised = true;
      state.isAuthenticated = !!action.payload;
    },
    logout: (state) => {
      state.user = null;
      removeAuthToken();
      state.isInitialised = false;
      state.isAuthenticated = false;
    },
    setInitialised : (state) => {
      state.isInitialised = true;
      state.isAuthenticated = false;
    }
  },
});

export const { setUser, logout, setInitialised } = authSlice.actions;
export default authSlice.reducer;

import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { UserProfileResponse } from "./types/profile.types";
import type { UserResponse } from "../home/types/home.types";

interface UserProfileState {
    UserData: UserResponse | null;
}

const initialState: UserProfileState = {
    UserData: null,
};

const profileSlice = createSlice({
    name: 'userProfile',
    initialState,
    reducers: {
        setUserProfile: (state, action: PayloadAction<UserResponse>) => {
            state.UserData = action.payload;
        },
        clearUserProfile: (state) => {
            state.UserData = null;
        }
    },
});

export const { setUserProfile, clearUserProfile } = profileSlice.actions;
export default profileSlice.reducer;
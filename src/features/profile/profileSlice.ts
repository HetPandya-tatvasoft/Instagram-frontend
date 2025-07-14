import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { UserProfileResponse } from "./types/profile.types";

interface UserProfileState {
    UserData: UserProfileResponse | null;
}

const initialState: UserProfileState = {
    UserData: null,
};

const profileSlice = createSlice({
    name: 'userProfile',
    initialState,
    reducers: {
        setUserProfile: (state, action: PayloadAction<UserProfileResponse>) => {
            state.UserData = action.payload;
        },
        clearUserProfile: (state) => {
            state.UserData = null;
        }
    },
});

export const { setUserProfile, clearUserProfile } = profileSlice.actions;
export default profileSlice.reducer;
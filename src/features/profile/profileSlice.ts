import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { IUserProfileResponse } from "./types/profile.types";
import type { IUserResponse } from "../home/types/home.types";

interface UserProfileState {
    UserData: IUserResponse | null;
}

const initialState: UserProfileState = {
    UserData: null,
};

const profileSlice = createSlice({
    name: 'userProfile',
    initialState,
    reducers: {
        setUserProfile: (state, action: PayloadAction<IUserResponse>) => {
            state.UserData = action.payload;
        },
        clearUserProfile: (state) => {
            state.UserData = null;
        }
    },
});

export const { setUserProfile, clearUserProfile } = profileSlice.actions;
export default profileSlice.reducer;
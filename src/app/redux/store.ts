import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../../features/authentication/slice/authSlice';
import userReducer from '../../features/profile/profileSlice'

export const store = configureStore({
    reducer : {
        auth : authReducer,
        userProfile : userReducer,
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
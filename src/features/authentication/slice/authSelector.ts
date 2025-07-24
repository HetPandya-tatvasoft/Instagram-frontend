import { RootState } from "../../../app/redux/store";

export const selectUser = ( state : RootState ) => state.auth.user;

export const selectIsAuthenticated = ( state : RootState ) =>
    !!state.auth.user && !!state.auth.user.token;

export const selectIsInitialised = ( state : RootState ) => state.auth.isInitialised;
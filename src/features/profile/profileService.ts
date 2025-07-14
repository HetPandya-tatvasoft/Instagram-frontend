import { getRequest, postRequest  } from "../../utils/httpClient.utils";
import type { UpdateUserProfilePayload, UserProfileResponse } from '../profile/types/profile.types'

const ENDPOINTS = {
    GET_PROFILE_DATA: '/user/get-logged-in-user',
    UPDATE_PROFILE : '/user/update-profile'
}

export const getUserProfile = () =>
    getRequest<UserProfileResponse>(ENDPOINTS.GET_PROFILE_DATA);

export const updateUserProfile = (payload : UpdateUserProfilePayload) => 
    postRequest<UserProfileResponse, UpdateUserProfilePayload>(ENDPOINTS.UPDATE_PROFILE, payload);
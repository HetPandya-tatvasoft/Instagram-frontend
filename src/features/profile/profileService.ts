import { getRequest, postRequest } from "../../utils/httpClient.utils";
import type {
  UpdateUserProfilePayload,
  UserProfileResponse,
} from "../profile/types/profile.types";

const ENDPOINTS = {
  GET_PROFILE_DATA: "/user/get-logged-in-user",
  UPDATE_PROFILE: "/user/update-profile",
  UPDATE_PROFILE_PICTURE: "/user/edit-profile-picture",
};

export const getUserProfile = () =>
  getRequest<UserProfileResponse>(ENDPOINTS.GET_PROFILE_DATA);

export const updateUserProfile = (payload: UpdateUserProfilePayload) =>
  postRequest<UserProfileResponse, UpdateUserProfilePayload>(
    ENDPOINTS.UPDATE_PROFILE,
    payload
  );

export const updateProfilePicture = async (
  file: File | null
): Promise<Blob> => {
  const formData = new FormData();
  if (file) {
    formData.append("profilePicture", file);
  }

  const response = await postRequest<Blob, FormData>(
    ENDPOINTS.UPDATE_PROFILE_PICTURE,
    formData,
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
      responseType: "blob",
    }
  );

  return response.data;
};

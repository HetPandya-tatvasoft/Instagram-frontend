import { useNavigate } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import type { ApiResponse } from "../../../@core/api/apiResponse.type";
import type {
  UpdateUserProfilePayload,
  UserProfileResponse,
} from "../types/profile.types";
import toast from "react-hot-toast";
import { updateUserProfile } from "../profileService";
import { routes } from "../../../common/constants/routes";
import { messages } from "../../../common/constants/messages";
import { handleApiError } from "../../../utils/error.utils";

export const useUpdateProfile = () => {
  const navigate = useNavigate();

  return useMutation<
    ApiResponse<UserProfileResponse>,
    Error,
    UpdateUserProfilePayload
  >({
    mutationFn: updateUserProfile,
    onSuccess: (response) => {
      if (!response.isSuccess) {
        toast.error(response.message);
        return;
      }
      const route = routes.mainRoutes.userProfile.replace(
        ":userId",
        (-1).toString()
      );
      navigate(route);
      toast.success(messages.profile.updateSuccess);
    },
    onError: (error) => {
      handleApiError(error);
    },
  });
};

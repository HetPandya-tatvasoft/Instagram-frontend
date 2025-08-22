import { useNavigate } from "react-router-dom";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { ApiResponse } from "../../../@core/api/apiResponse.type";
import type {
  IUpdateUserProfilePayload,
  IUserProfileResponse,
} from "../types/profile.types";
import { updateUserProfile } from "../profileService";
import { routes } from "../../../common/constants/routes";
import { handleApiError } from "../../../utils/error.utils";
import { tanstackQueryKeys } from "../../../common/constants/keys";

export const useUpdateProfile = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  return useMutation<
    ApiResponse<IUserProfileResponse>,
    Error,
    IUpdateUserProfilePayload
  >({
    mutationFn: updateUserProfile,
    onSuccess: (response) => {
      if (!response.isSuccess) {
        return;
      }
      const route = routes.mainRoutes.userProfile.replace(
        ":userId",
        (-1).toString()
      );
      queryClient.invalidateQueries({
        queryKey: [tanstackQueryKeys.getUserInfoProfile],
      });

      navigate(route);
    },
    onError: (error) => {
      handleApiError(error);
    },
  });
};

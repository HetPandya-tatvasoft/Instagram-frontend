import { useNavigate } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import type { ApiResponse } from "../../../@core/api/apiResponse.type";
import type { UpdateUserProfilePayload, UserProfileResponse } from "../types/profile.types";
import toast from "react-hot-toast";
import { updateUserProfile } from "../profileService";
import { ROUTES } from "../../../common/constants/routes";
import { MESSAGES } from "../../../common/constants/messages";
import { handleApiError } from "../../../utils/error.utils";

export const useUpdateProfile = () => {
    const navigate = useNavigate();

    return useMutation<ApiResponse<UserProfileResponse>, Error, UpdateUserProfilePayload>({
        mutationFn: updateUserProfile,
        onSuccess: (response) => {
            if (!response.isSuccess) {
                toast.error(response.message);
                return;
            }

            navigate(ROUTES.MAIN_ROUTES.PROFILE);
            toast.success(MESSAGES.PROFILE.UPDATE_SUCCESS);
        },
        onError: (error) => {
            handleApiError(error);
        },
    });
};



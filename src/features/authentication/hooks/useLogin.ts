import { useMutation } from "@tanstack/react-query";
import { useAppDispatch } from "../../../app/redux/hooks"
import type { ILoginPayload, ILoginResponse } from "../types/auth.type";
import { setUser } from "../slice/authSlice";
import { loginUser } from "../authService";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { messages } from "../../../common/constants/messages";
import { setAuthToken } from "../../../utils/cookie.utils";
import { decodeToken } from "../../../utils/jwt.utils";
import { buildUserFromToken } from "../../../utils/user.utils";
import { handleApiError } from "../../../utils/error.utils";
import type { ApiResponse } from "../../../@core/api/apiResponse.type";
import { routes } from "../../../common/constants/routes";

export const useLogin = () => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    return useMutation<ApiResponse, Error, ILoginPayload>({
        mutationFn: loginUser,
        onSuccess: (response) => {
            if (!response.isSuccess) {
                toast.error(messages.auth.invalidCredentials);
                return;
            }

            const token = response.data.token;

            const decodedTokenData = decodeToken(token);

            if (!decodedTokenData) {
                return;
            }

            // Constructs User Object from the decoded token
            const user = buildUserFromToken(token, decodedTokenData);

            setAuthToken(token);

            dispatch(setUser(user));

            toast.success(messages.auth.loginSuccess);
            console.log("PROFILE route constant:", routes.mainRoutes.profile);
            navigate(routes.mainRoutes.home);
        }, 
        onError: (error) => {
            handleApiError(error);
        }

    })
}
import { useMutation } from "@tanstack/react-query";
import { useAppDispatch } from "../../../app/redux/hooks"
import type { LoginPayload, LoginResponse } from "../types/auth.type";
import { setUser } from "../authSlice";
import { loginUser } from "../authService";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { MESSAGES } from "../../../common/constants/messages";
import { setAuthToken } from "../../../utils/cookie.utils";
import { decodeToken } from "../../../utils/jwt.utils";
import { buildUserFromToken } from "../../../utils/user.utils";
import { handleApiError } from "../../../utils/error.utils";
import type { ApiResponse } from "../../../@core/api/apiResponse.type";

export const useLogin = () => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    return useMutation<ApiResponse, Error, LoginPayload>({
        mutationFn: loginUser,
        onSuccess: (response) => {
            if (!response.isSuccess) {
                toast.error(MESSAGES.AUTH.INVALID_CREDENTIALS);
                toast.error(response.message)
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
            toast.success(MESSAGES.AUTH.LOGIN_SUCCESS);
            navigate("/posts")
        },
        onError: (error) => {
            handleApiError(error);
            console.error("Login failed:", error);
        }

    })
}
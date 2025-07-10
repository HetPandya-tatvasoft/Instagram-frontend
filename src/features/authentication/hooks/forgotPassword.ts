import { useNavigate } from 'react-router-dom';
import { useMutation } from '@tanstack/react-query';
import type { ForgotPasswordPayload, stringResponseGeneral } from '../types/auth.type';
import { sendResetLink } from '../authService';
import { MESSAGES } from '../../../common/constants/messages';
import toast from 'react-hot-toast';
import type { ApiResponse } from '../../../@core/api/apiResponse.type';
import { handleApiError } from "../../../utils/error.utils";
import { ROUTES } from '../../../common/constants/routes'

const useSendResetPasswordLink = () => {

    const navigate = useNavigate();

    return useMutation<ApiResponse<stringResponseGeneral>, Error, ForgotPasswordPayload>({
        mutationFn: sendResetLink,
        onSuccess: (response) => {
            toast.success(MESSAGES.AUTH.RESET_LINK_SUCCESS);
            navigate(ROUTES.LOGIN)
        },
        onError: (error) => {
            handleApiError(error)
            toast.error(MESSAGES.AUTH.RESET_LINK_FAILED);
        },
    });
};

export default useSendResetPasswordLink
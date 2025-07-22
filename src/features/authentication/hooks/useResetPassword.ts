import { useNavigate } from 'react-router-dom';
import { useMutation } from '@tanstack/react-query';
import type { stringResponseGeneral, ResetPasswordPayload } from '../types/auth.type';
import { resetPassword } from '../authService';
import { messages } from '../../../common/constants/messages';
import toast from 'react-hot-toast';
import { handleApiError } from "../../../utils/error.utils";
import type { ApiResponse } from '../../../@core/api/apiResponse.type';
import { routes } from '../../../common/constants/routes'

const useResetPassword = () => {

    const navigate = useNavigate();

    return useMutation<ApiResponse<stringResponseGeneral>, Error, ResetPasswordPayload>({
        mutationFn: resetPassword,
        onSuccess: (response) => {
            toast.success(messages.auth.resetPasswordSuccess);
            navigate(routes.login)
        },
        onError: (error) => {
            handleApiError(error)

            // do this only if handleapi doesn't work
            // toast.error(messages.auth.resetPasswordFailed);
        },
    });
};

export default useResetPassword;
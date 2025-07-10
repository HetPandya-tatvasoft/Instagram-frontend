import { useNavigate } from 'react-router-dom';
import { useMutation } from '@tanstack/react-query';
import type { stringResponseGeneral, ResetPasswordPayload } from '../types/auth.type';
import { resetPassword } from '../authService';
import { MESSAGES } from '../../../common/constants/messages';
import toast from 'react-hot-toast';
import { handleApiError } from "../../../utils/error.utils";
import type { ApiResponse } from '../../../@core/api/apiResponse.type';

const useResetPassword = () => {

    const navigate = useNavigate();

    return useMutation<ApiResponse<stringResponseGeneral>, Error, ResetPasswordPayload>({
        mutationFn: resetPassword,
        onSuccess: (response) => {
            toast.success(MESSAGES.AUTH.RESET_PASSWORD_SUCCESS);
            navigate('/accounts/login')
        },
        onError: (error) => {
            handleApiError(error)
            toast.error(MESSAGES.AUTH.RESET_PASSWORD_FAILED);
        },
    });
};

export default useResetPassword;
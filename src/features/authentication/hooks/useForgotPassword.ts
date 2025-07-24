import { useNavigate } from 'react-router-dom';
import { useMutation } from '@tanstack/react-query';
import type { IForgotPasswordPayload, IStringResponseGeneral } from '../types/auth.type';
import { sendResetLink } from '../authService';
import { messages } from '../../../common/constants/messages';
import toast from 'react-hot-toast';
import type { ApiResponse } from '../../../@core/api/apiResponse.type';
import { handleApiError } from "../../../utils/error.utils";
import { routes } from '../../../common/constants/routes'

const useSendResetPasswordLink = () => {

    const navigate = useNavigate();

    return useMutation<ApiResponse<IStringResponseGeneral>, Error, IForgotPasswordPayload>({
        mutationFn: sendResetLink,
        onSuccess: (response) => {
            toast.success(messages.auth.resetLinkSuccess);
            navigate(routes.login)
        },
        onError: (error) => {
            handleApiError(error)
            toast.error(messages.auth.resetLinkFailed);
        },
    });
};

export default useSendResetPasswordLink
import { useNavigate } from 'react-router-dom';
import { useMutation } from '@tanstack/react-query';
import type { ForgotPasswordPayload, SendResetLinkResponse } from '../types/auth.type';
import { sendResetLink } from '../authService';
import { MESSAGES } from '../../../common/constants/messages';
import toast from 'react-hot-toast';

const useSendResetPasswordLink = () => {

    const navigate = useNavigate();

    return useMutation<SendResetLinkResponse, Error, ForgotPasswordPayload>({
        mutationFn: sendResetLink,
        onSuccess: (response) => {
            console.log(response);
            toast.success(MESSAGES.AUTH.RESET_LINK_SUCCESS);
            navigate('/accounts/login')
        },
        onError: () => {
            toast.error(MESSAGES.AUTH.RESET_LINK_FAILED);
        },
    });
};

export default useSendResetPasswordLink
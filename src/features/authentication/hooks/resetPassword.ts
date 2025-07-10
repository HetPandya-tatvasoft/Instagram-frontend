import { useNavigate } from 'react-router-dom';
import { useMutation } from '@tanstack/react-query';
import type { stringResponseGeneral, ResetPasswordPayload } from '../types/auth.type';
import { resetPassword } from '../authService';
import { MESSAGES } from '../../../common/constants/messages';
import toast from 'react-hot-toast';

const useResetPassword = () => {

    const navigate = useNavigate();

    return useMutation<stringResponseGeneral, Error, ResetPasswordPayload>({
        mutationFn: resetPassword,
        onSuccess: (response) => {
            toast.success(MESSAGES.AUTH.RESET_PASSWORD_SUCCESS);
            navigate('/accounts/login')
        },
        onError: () => {
            toast.error(MESSAGES.AUTH.RESET_PASSWORD_FAILED);
        },
    });
};

export default useResetPassword;
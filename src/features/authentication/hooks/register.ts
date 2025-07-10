import React from 'react'
import { useAppDispatch } from '../../../app/redux/hooks'
import { useNavigate } from 'react-router-dom';
import { useMutation } from '@tanstack/react-query';
import type { RegisterUserPayload, RegisterUserResponse } from '../types/auth.type';
import { registerUser } from '../authService';
import { MESSAGES } from '../../../common/constants/messages';
import toast from 'react-hot-toast';
import type { ApiResponse } from '../../../@core/api/apiResponse.type';
import { handleApiError } from "../../../utils/error.utils";

const useRegister = () => {

    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    return useMutation<ApiResponse<RegisterUserResponse>, Error, RegisterUserPayload>({
        mutationFn: registerUser,
        onSuccess: (response) => {
            toast.success(MESSAGES.AUTH.SIGNUP_SUCCESS);
            navigate('/accounts/login')
        },
        onError: (response, error) => {
            handleApiError(error);
            // toast.error(MESSAGES.AUTH.SIGNUP_FAILED);
        }

    })
}

export default useRegister
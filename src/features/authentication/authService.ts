import type { LoginPayload, LoginResponse, RegisterUserPayload, RegisterUserResponse, User } from './types/auth.type';
import API from '../../utils/axios.utils';

const ENDPOINTS = {
    LOGIN: '/auth/login',
    REGISTER_USER: '/auth/register',
    CURRENT_USER: '/user/get-logged-in-user',
};

export const loginUser = async (data: LoginPayload): Promise<LoginResponse> => {
    console.log(data);
    const response = await API.post<LoginResponse>(ENDPOINTS.LOGIN, data);
    console.log(response);

    return response.data;
};

export const registerUser = async (data: RegisterUserPayload): Promise<RegisterUserResponse> => {
    console.log(data);
    const response = await API.post<RegisterUserResponse>(ENDPOINTS.REGISTER_USER, data);
    console.log(response);

    return response.data;
}

export const fetchCurrentUser = async (): Promise<User> => {
    const response = await API.get<User>('/user/get-logged-in-user');
    return response.data;
}
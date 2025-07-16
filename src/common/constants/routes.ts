const API_URL = "http://localhost:5259/api";

export const PUBLIC_ROUTES = {
    HOME: '/',
    LOGIN: `${API_URL}/auth/login`,
    REGISTER: `${API_URL}/auth/register`
};

export const PRIVATE_ROUTES = {

};

export const PATHNAME_PORTION = {
    LOGIN_PART : 'login',
    LOGIN_FULLPART : 'accounts/login',
}

export const ROUTES = {
    LOGIN : '/accounts/login',
    REGISTER: '/accounts/register',
    FORGOT_PASSWORD : '/accounts/password/forgot',
    RESET_PASSWORD : '/accounts/password/reset-password',
    
    MAIN_ROUTES : {
        HOME : '/home/en-home',
        PROFILE : '/het-pandya/profile',
        UPDATE_PROFILE : '/het-pandya/update-profile'
    }
}

const API_URL = "http://localhost:5254/api";

export const PUBLIC_ROUTES = {
    HOME: '/',
    LOGIN: `${API_URL}/auth/login`,
    REGISTER: `${API_URL}/auth/register`
};


export const PRIVATE_ROUTES = {

};

export const PATHNAME_PORTION = {
    LOGIN_PART : 'login',
    LOGIN_FULLPART : 'accounts/login'
}
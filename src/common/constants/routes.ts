const apiUrl = "http://localhost:5259/api";

export const publicRoutes = {
  home: "/",
  login: `${apiUrl}/auth/login`,
  register: `${apiUrl}/auth/register`,
};

export const privateRoutes = {};

export const pathnamePortion = {
  loginPart: "login",
  loginFullPart: "accounts/login",
};

export const routes = {
  login: "/accounts/login",
  register: "/accounts/register",
  forgotPassword: "/accounts/password/forgot",
  resetPassword: "/accounts/password/reset-password",

  mainRoutes: {
    home: "/home/en-home",
    profile: "/het-pandya/profile",
    updateProfile: "/het-pandya/update-profile",
    userProfile: "/profile/:userId",
    notifications: "/notifications",
    postDetails : "/post/:postId"
  },
};

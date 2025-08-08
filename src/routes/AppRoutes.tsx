import { Routes, Route, Navigate } from "react-router-dom";
import LoginPage from "../features/authentication/pages/LoginPage";
import PrivateRoute from "./PrivateRoute";
import AuthInitializer from "../common/components/AuthInitializer";
import RegisterPage from "../features/authentication/pages/RegisterPage";
import ForgotPasswordPage from "../features/authentication/pages/ForgotPasswordPage";
import ResetPasswordPage from "../features/authentication/pages/ResetPasswordPage";
import { routes } from "../common/constants/routes";
import ProfilePage from "../features/profile/pages/ProfilePage";
import UserProfilePage from "../features/profile/pages/UserProfilePage";
import EditProfilePage from "../features/profile/pages/EditProfilePage";
import HomePage from "../features/home/pages/HomePage";
import NotificationsPage from "../features/notifications/page/NotificationsPage";
import PostDetails from "../features/posts/pages/PostDetails";
import SettingsAndPrivacy from "../features/settingsAndPrivacy/pages/SettingPage";
import NotificationSettings from "../features/profile/components/NotificationSettings";

const AppRoutes = () => {
  return (
    <>
      <Routes>
        <Route path={routes.login} element={<LoginPage />} />
        <Route path={routes.register} element={<RegisterPage />} />
        <Route path={routes.forgotPassword} element={<ForgotPasswordPage />} />
        <Route path={routes.resetPassword} element={<ResetPasswordPage />} />

        <Route
          path={routes.mainRoutes.home}
          element={
            <PrivateRoute>
              <HomePage />
            </PrivateRoute>
          }
        />

        <Route
          path={routes.mainRoutes.userProfile}
          element={
            <PrivateRoute>
              <UserProfilePage />
            </PrivateRoute>
          }
        />

        <Route
          path={routes.mainRoutes.profile}
          element={
            <PrivateRoute>
              <ProfilePage />
            </PrivateRoute>
          }
        />

        <Route
          path={routes.mainRoutes.notifications}
          element={
            <PrivateRoute>
              <NotificationsPage />
            </PrivateRoute>
          }
        />

        <Route
          path={routes.mainRoutes.updateProfile}
          element={
            <PrivateRoute>
              <EditProfilePage />
            </PrivateRoute>
          }
        />

        <Route
          path={routes.mainRoutes.postDetails}
          element={
            <PrivateRoute>
              <PostDetails />
            </PrivateRoute>
          }
        />

        <Route
          path={routes.mainRoutes.settingsAndPrivacy}
          element={
            <PrivateRoute>
              <SettingsAndPrivacy />
            </PrivateRoute>
          }
        />

        <Route
          path={routes.mainRoutes.notificationSettings}
          element={
            <PrivateRoute>
              <NotificationSettings />
            </PrivateRoute>
          }
        />

        <Route path="*" element={<Navigate to={routes.login} replace />} />
      </Routes>
    </>
  );
};

export default AppRoutes;

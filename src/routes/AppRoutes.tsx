import { Routes, Route, Navigate } from 'react-router-dom';
import LoginPage from '../features/authentication/pages/LoginPage';
import PrivateRoute from './PrivateRoute';
import AuthInitializer from '../common/components/AuthInitializer';
import RegisterPage from '../features/authentication/pages/RegisterPage';
import ForgotPasswordPage from '../features/authentication/pages/ForgotPasswordPage';
import ResetPasswordPage from '../features/authentication/pages/ResetPasswordPage';
import { ROUTES } from '../common/constants/routes';
import ProfilePage from '../features/profile/pages/ProfilePage';

const AppRoutes = () => {
    return (
        <>
            <AuthInitializer />
            <Routes>
                <Route path={ROUTES.LOGIN} element={<LoginPage />} />
                <Route path={ROUTES.REGISTER} element={<RegisterPage />} />
                <Route path={ROUTES.FORGOT_PASSWORD} element={<ForgotPasswordPage />} />
                <Route path={ROUTES.RESET_PASSWORD} element={<ResetPasswordPage />} />

                <Route path={ROUTES.MAIN_ROUTES.PROFILE} element={
                    <PrivateRoute>
                        <ProfilePage />
                    </PrivateRoute>
                } />

                <Route path='*' element={<Navigate to={ROUTES.LOGIN} replace />} />
            </Routes>
        </>
    )
}

export default AppRoutes;

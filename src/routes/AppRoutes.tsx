import { Routes, Route, Navigate } from 'react-router-dom';
import LoginPage from '../features/authentication/pages/LoginPage';
import Posts from '../features/mock/Posts';
import PrivateRoute from './PrivateRoute';
import AuthInitializer from '../common/components/AuthInitializer';
import RegisterPage from '../features/authentication/pages/RegisterPage';
import ForgotPasswordPage from '../features/authentication/pages/ForgotPasswordPage';
import ResetPasswordPage from '../features/authentication/pages/ResetPasswordPage';
import { ROUTES } from '../common/constants/routes';

const AppRoutes = () => {
    return (
        <>
            <AuthInitializer />
            <Routes>
                <Route path={ROUTES.LOGIN} element={<LoginPage />} />
                <Route path={ROUTES.REGISTER}  element={<RegisterPage />} />
                <Route path={ROUTES.FORGOT_PASSWORD} element={<ForgotPasswordPage />} />
                <Route path={ROUTES.RESET_PASSWORD} element={<ResetPasswordPage />} />

                <Route path='/posts' element={
                    <PrivateRoute>
                        <Posts />
                    </PrivateRoute>
                } />

                <Route path='*' element={<Navigate to={ROUTES.LOGIN} replace />} />
            </Routes>
        </>
    )
}

export default AppRoutes;

import { Routes, Route, Navigate } from 'react-router-dom';
import LoginPage from '../features/authentication/pages/LoginPage';
import Posts from '../features/mock/Posts';
import PrivateRoute from './PrivateRoute';
import AuthInitializer from '../common/components/AuthInitializer';
import RegisterPage from '../features/authentication/pages/RegisterPage';
import ForgotPasswordPage from '../features/authentication/pages/ForgotPasswordPage';
import ResetPasswordPage from '../features/authentication/pages/ResetPasswordPage';

const AppRoutes = () => {
    return (
        <>
            <AuthInitializer />
            <Routes>
                <Route path='/accounts/login' element={<LoginPage />} />
                <Route path='/accounts/register' element={<RegisterPage />} />
                <Route path='/accounts/password/forgot' element={<ForgotPasswordPage />} />
                <Route path='/accounts/password/reset-password' element={<ResetPasswordPage />} />

                <Route path='/posts' element={
                    <PrivateRoute>
                        <Posts />
                    </PrivateRoute>
                } />

                <Route path='*' element={<Navigate to="/accounts/login" replace />} />
            </Routes>
        </>
    )
}

export default AppRoutes;

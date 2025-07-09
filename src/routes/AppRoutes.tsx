import { Routes, Route, Navigate } from 'react-router-dom';
import LoginForm from '../features/authentication/components/LoginForm';
import Posts from '../features/mock/Posts';
import PrivateRoute from './PrivateRoute';
import AuthInitializer from '../common/components/AuthInitializer';
import RegisterForm from '../features/authentication/components/RegisterForm';
import ForgotPasswordForm from '../features/authentication/components/ForgotPasswordForm';
import ResetPassword from '../features/authentication/components/ResetPassword';

const AppRoutes = () => {
    return (
        <>
            <AuthInitializer />
            <Routes>
                <Route path='/accounts/login' element={<LoginForm />} />
                <Route path='/accounts/register' element={<RegisterForm />} />
                <Route path='/accounts/password/forgot' element={<ForgotPasswordForm />} />
                <Route path='/accounts/password/reset-password' element={<ResetPassword />} />

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

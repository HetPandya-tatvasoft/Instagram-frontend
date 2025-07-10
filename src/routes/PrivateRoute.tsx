
import React, { type JSX } from 'react'
import { useAppSelector } from '../app/redux/hooks'
import { Navigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';

interface DecodedToken {
    exp: number;
    [key: string]: unknown;
}

const isTokenExpired = (token: string): boolean => {
    try {
        const decoded = jwtDecode<DecodedToken>(token);
        const currentTime = Math.floor(Date.now() / 1000);
        return decoded.exp < currentTime;
    } catch (error) {
        return true;
    }
}

const PrivateRoute = ({ children }: { children: JSX.Element }) => {

    const { user, isInitialised } = useAppSelector((state) => state.auth);

    if (!isInitialised) {
        return <div>Loading...</div>;
    }

    if (!user || !user.token || isTokenExpired(user.token)) {
        return <Navigate to="/accounts/login" replace />;
    }

    return children;
}

export default PrivateRoute;
import { useEffect } from "react";
import { useAppDispatch } from "../../app/redux/hooks";
import type { User } from "../../features/authentication/types/auth.type"
import Cookies from 'js-cookie';
import { jwtDecode } from 'jwt-decode';
import { setUser, setInitialised } from "../../features/authentication/authSlice";
import { getAuthToken } from "../../utils/cookie.utils";

interface DecodedToken extends User {
    exp: number;
}


const AuthInitializer = () => {
    const dispatch = useAppDispatch();
    console.log("Auth Initalizer is being called brother🔥🔥💀")
    useEffect(() => {
        const token = getAuthToken();

        if (!token) {
            dispatch(setInitialised());
            return;
        }
        try {
            const decoded: DecodedToken = jwtDecode(token);
            const isValid = decoded.exp > Math.floor(Date.now() / 1000);

            if (isValid) {
                dispatch(setUser({ ...decoded, token }));
                console.log("Dispatch is called and successfully did nothing")
            } else {
                Cookies.remove('token');
                dispatch(setInitialised());
            }
        } catch (err) {
            Cookies.remove('token');
        }
    }, [dispatch])

    return null;
}

export default AuthInitializer
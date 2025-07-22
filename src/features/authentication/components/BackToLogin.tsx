import { useNavigate } from "react-router-dom";
import { routes } from '../../../common/constants/routes'
import { useCallback } from "react";


const BackToLogin = () => {
    const loginRoutePath = routes.login;

    const navigate = useNavigate();

    const navigateToLogin = useCallback(() => {
        navigate(loginRoutePath);
    }, [loginRoutePath, navigate])

    return (
        <div className="w-full">
            <button type="button" onClick={navigateToLogin} className="w-full px-4 py-2 border-t border-solid border-gray-300 text-sm text-gray-800 font-semibold cursor-pointer">
                Back to Login
            </button>
        </div>
    )
}

export default BackToLogin
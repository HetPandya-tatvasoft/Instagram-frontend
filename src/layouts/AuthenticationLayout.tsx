import type React from "react"
import { Link, useLocation } from "react-router-dom"
import { PATHNAME_PORTION } from "../consts/routes";


interface AuthFormPageProps {
    children: React.ReactNode,
}

const AuthFormPage: React.FC<AuthFormPageProps> = ({ children }) => {
    const location = useLocation();
    const isLogin = location.pathname.includes(PATHNAME_PORTION.LOGIN_PART);

    return (
        <div className="flex justify-center items-center min-h-screen">
            <div>
                {children}
            </div>
        </div >
    )
}

export default AuthFormPage
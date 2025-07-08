import type React from "react"

import { Link, useLocation } from "react-router-dom"
import { PATHNAME_PORTION } from "../../../consts/routes";
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
interface AuthFormPageProps {
    children: React.ReactNode,
}

const AuthFormPage: React.FC<AuthFormPageProps> = ({ children }) => {

    const location = useLocation();
    const isLogin = location.pathname.includes(PATHNAME_PORTION.LOGIN_PART);
    console.log(`Our current location is : ${location.pathname.includes(PATHNAME_PORTION.LOGIN_PART)}`)

    return (
        <div className="flex justify-center items-center min-h-screen">
            <div>
                <LocalizationProvider dateAdapter={AdapterDateFns}>

                    <div className="flex justify-center items-center">
                        <div className="border-1 border-solid border-gray-300 p-2 m-4  w-[350px]">
                            {children}
                        </div>
                    </div>
                    <div className="flex justify-center items-center mt-2">
                        <div className="border-1 border-solid border-gray-300 p-4  w-[350px]">
                            {isLogin ? (
                                <>
                                    <div className="flex justify-center gap-2">
                                        Don't have an account ?{"  "}
                                        <Link to="/accounts/register" className="text-blue-500 font-medium">
                                            Sign up
                                        </Link>
                                    </div>
                                </>
                            ) : (
                                <>
                                    <div className="flex justify-center gap-2">
                                        <span> Already have an account ?{"  "}</span>
                                        <Link to="/accounts/login" className="text-blue-500 font-medium">
                                            Log in
                                        </Link>
                                    </div>
                                </>
                            )}
                        </div>
                    </div>
                </LocalizationProvider>
            </div>
        </div >
    )
}

export default AuthFormPage
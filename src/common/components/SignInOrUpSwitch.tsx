
import { Link, useLocation } from "react-router-dom"
import { pathnamePortion } from "../constants/routes";
import { routes } from '../../common/constants/routes'

const SignInOrUpSwitch = () => {
    const location = useLocation();
    const isLogin = location.pathname.includes(pathnamePortion.loginPart);
    return (
        <>
            {
                isLogin ? (
                    <>
                        <div className="flex justify-center gap-2 py-4">
                            Don't have an account ?{"  "}
                            <Link to={routes.register} className="text-blue-500 font-medium">
                                Sign up
                            </Link>
                        </div>
                    </>
                ) : (
                    <>
                        <div className="flex justify-center gap-2 py-4">
                            <span> Already have an account ?{"  "}</span>
                            <Link to={routes.login} className="text-blue-500 font-medium">
                                Log in
                            </Link>
                        </div>
                    </>
                )
            }
        </>
    )
}

export default SignInOrUpSwitch;
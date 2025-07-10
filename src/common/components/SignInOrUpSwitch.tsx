
import { Link, useLocation } from "react-router-dom"
import { PATHNAME_PORTION } from "../constants/routes";
import { ROUTES } from '../../common/constants/routes'

const SignInOrUpSwitch = () => {
    const location = useLocation();
    const isLogin = location.pathname.includes(PATHNAME_PORTION.LOGIN_PART);
    return (
        <>
            {
                isLogin ? (
                    <>
                        <div className="flex justify-center gap-2 py-4">
                            Don't have an account ?{"  "}
                            <Link to={ROUTES.REGISTER} className="text-blue-500 font-medium">
                                Sign up
                            </Link>
                        </div>
                    </>
                ) : (
                    <>
                        <div className="flex justify-center gap-2 py-4">
                            <span> Already have an account ?{"  "}</span>
                            <Link to={ROUTES.LOGIN} className="text-blue-500 font-medium">
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
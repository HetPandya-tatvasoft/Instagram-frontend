import { TextField } from "@mui/material";
import * as Yup from "yup";
import type { ForgotPasswordPayload } from "../types/auth.type";
import { useFormik } from "formik";
import useSendResetPasswordLink from "../hooks/forgotPassword";

const VALIDATION_SCHEMA = Yup.object({
    credential: Yup.string()
        .required("Email, Username or Mobile Number is required"),
})

const INITIAL_VALUES: ForgotPasswordPayload = {
    credential: "",
}

const ForgotPasswordForm: React.FC = () => {

    const { mutate, isPending, error } = useSendResetPasswordLink();

    const handleSubmit = (values: ForgotPasswordPayload) => {
        console.log("Going to handle submit")
        mutate(values, {});
    }

    const formik = useFormik({
        initialValues: INITIAL_VALUES,
        validationSchema: VALIDATION_SCHEMA,
        onSubmit: handleSubmit
    })

    return (
        <>
            <div className="flex justify-center h-screen items-center">
                <div className="border-1 border-solid border-gray-300 m-3  w-[390px]">
                    <div className="forgotpass-main-container p-8">
                        <div className="forgotpass-heading mt-2">
                            <div className="forgotpass-password-logo flex justify-center items-center">
                                <svg aria-label="Trouble logging in?" className="x1lliihq x1n2onr6 x5n08af" fill="currentColor" height="96" role="img" viewBox="0 0 96 96" width="96"><title>Trouble logging in?</title><circle cx="48" cy="48" fill="none" r="47" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"></circle><path d="M60.931 70.001H35.065a5.036 5.036 0 0 1-5.068-5.004V46.005A5.036 5.036 0 0 1 35.065 41H60.93a5.035 5.035 0 0 1 5.066 5.004v18.992A5.035 5.035 0 0 1 60.93 70ZM37.999 39.996v-6.998a10 10 0 0 1 20 0v6.998" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"></path></svg>
                            </div>
                            <div className="flex justify-center font-semibold mt-4">
                                <span>Trouble logging in ?</span>
                            </div>
                        </div>
                        <div className="w-full mt-2">
                            <p className="text-sm text-wrap text-center text-gray-500">
                                Enter your email, phone, or username and we'll <br /> send you a link to get back into your account.
                            </p>
                        </div>
                        <div className="forgotpass-form mt-4">
                            <div className="flex justify-center">
                                <form className="w-full" onSubmit={formik.handleSubmit}>
                                    <TextField
                                        label="Email, Username or Contact Number"
                                        type="text"
                                        variant="outlined"
                                        size="small"
                                        id="credentialInputInstaForgotPass"
                                        name="credential"
                                        className="w-full"
                                        value={formik.values.credential}
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                        error={formik.touched.credential && Boolean(formik.errors.credential)}
                                        helperText={formik.touched.credential && formik.errors.credential}
                                        fullWidth
                                    />
                                    <button
                                        type="submit"
                                        disabled = {isPending}
                                        className="bg-[#0095f6] hover:bg-[#1877f2] text-white py-1 rounded-lg font-medium disabled:opacity-50 w-full mt-4"
                                    >
                                        {isPending ? "Sending Reset Link .... " : "Send Reset Link"}
                                    </button>
                                </form>
                            </div>
                        </div>
                        <div className="failed-reset-link flex justify-center mt-4">
                            <p className="bg-[##00376b] text-sm">Can't resest your password ?</p>
                        </div>
                        <div className="flex items-center my-4">
                            <div className="flex-1 h-px bg-gray-300" />
                            <span className="px-2 text-gray-400 text-sm">OR</span>
                            <div className="flex-1 h-px bg-gray-300" />
                        </div>
                        <div className="flex justify-center">
                            <p className="text-black font-semibold">Create new account</p>
                        </div>
                    </div>
                    <div className="w-full">
                        <button type="button" disabled={isPending} className="w-full px-4 py-2 border-t border-solid border-gray-300 text-sm text-gray-800 font-semibold">
                            Back to Login
                        </button>
                    </div>
                </div>
            </div>
        </>
    )
};


export default ForgotPasswordForm;
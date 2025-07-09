import { useCallback, useState } from "react";
import type { LoginPayload } from "../types/auth.type";
import { useLogin } from "../hooks/login";
import { Box, TextField } from "@mui/material";
import instaLogo from "../../../assets/images/insta-text-logo.png";
import { useFormik } from "formik";
import * as Yup from "yup";
import AuthFormPage from "../pages/AuthFormPage";

const VALIDATION_SCHEMA = Yup.object({
    credential: Yup.string()
        // .email("Invalid Email Address")
        .required("Email, Username or Mobile Number is required"),
    password: Yup.string()
        .required("Password is required")
        .matches(
            /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,15}$/,
            "Password must be 8-15 characters, include uppercase, lowercase, number, and special character"
        ),
});

const INITIAL_VALUES: LoginPayload = {
    credential: "",
    password: "",
};

const LoginForm: React.FC = () => {

    const { mutate, isPending, error } = useLogin();

    const handleSubmit = useCallback(
        (values: LoginPayload) => {
            mutate(values, {
                onError: () => {

                }
            })
        },
        [mutate],
    );

    const formik = useFormik({
        initialValues: INITIAL_VALUES,
        validationSchema: VALIDATION_SCHEMA,
        onSubmit: handleSubmit,
    })

    return (
        <>
            <AuthFormPage>
                <Box className=" flex items-center justify-center">
                    <div className=" p-8 w-full max-w-sm">
                        <img src={instaLogo} alt="Instagram" className="mx-auto mb-8 h-16" />

                        <div className="">
                            <form onSubmit={formik.handleSubmit} className="flex flex-col gap-4">
                                <TextField
                                    label="Email, Username or Mobile Number"
                                    type="text"
                                    variant="outlined"
                                    id="credentialInputInstaLogin"
                                    name="credential"
                                    value={formik.values.credential}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    error={formik.touched.credential && Boolean(formik.errors.credential)}
                                    helperText={formik.touched.credential && formik.errors.credential}
                                />
                                <TextField
                                    id="passwordInputInstaLogin"
                                    name="password"
                                    label="Password"
                                    type="password"
                                    variant="outlined"
                                    value={formik.values.password}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    error={formik.touched.password && Boolean(formik.errors.password)}
                                    helperText={formik.touched.password && formik.errors.password}
                                />
                                <button
                                    type="submit"
                                    disabled={isPending}
                                    className="bg-[#4cb5f9] hover:bg-[#4099db] text-white py-1 rounded-lg font-medium disabled:opacity-50"
                                >
                                    {isPending ? "Logging In..." : "Log In"}
                                </button>
                            </form>

                            <div className="flex items-center my-4">
                                <div className="flex-1 h-px bg-gray-300" />
                                <span className="px-2 text-gray-400 text-sm">OR</span>
                                <div className="flex-1 h-px bg-gray-300" />
                            </div>

                            <div className="flex justify-center text-black pt-4">
                                <p className="text-sm text-right cursor-pointer font-semibold">
                                    Forgot password?
                                </p>
                            </div>
                        </div>
                    </div>
                </Box>
            </AuthFormPage>
        </>
    )
}

export default LoginForm
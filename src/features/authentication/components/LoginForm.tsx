import { useCallback } from "react";
import type { LoginPayload } from "../types/auth.type";
import { useLogin } from "../hooks/login";
import { Box } from "@mui/material";
import instaLogo from "../../../assets/images/insta-text-logo.png";
import { useFormik, useField } from "formik";
import * as Yup from "yup";
import { Link } from "react-router-dom";
import FormButton from '../../../common/components/FormButton'
import FormikTextField from "../../../common/components/FormikTextField"; // adjust path as needed

const VALIDATION_SCHEMA = Yup.object({
    credential: Yup.string().required("Email, Username or Mobile Number is required"),
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
    const { mutate, isPending } = useLogin();

    const handleSubmit = useCallback(
        (values: LoginPayload) => {
            mutate(values);
        },
        [mutate]
    );

    const formik = useFormik({
        initialValues: INITIAL_VALUES,
        validationSchema: VALIDATION_SCHEMA,
        onSubmit: handleSubmit,
    });

    return (
        <Box className="flex items-center justify-center">
            <div className="p-8 w-full max-w-sm">
                <img src={instaLogo} alt="Instagram" className="mx-auto mb-8 h-16" />

                <form onSubmit={formik.handleSubmit} className="flex flex-col gap-4">
                    <FormikTextField
                        label="Email, Username or Mobile Number"
                        id="credentialInputInstaLogin"
                        name="credential"
                        value={formik.values.credential}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        error={formik.touched.credential && Boolean(formik.errors.credential)}
                        helperText={formik.touched.credential && formik.errors.credential}
                    />
                    <FormikTextField
                        label="Password"
                        id="passwordInputInstaLogin"
                        name="password"
                        type="password"
                        value={formik.values.password}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        error={formik.touched.password && Boolean(formik.errors.password)}
                        helperText={formik.touched.password && formik.errors.password}
                    />
                    <FormButton
                        type="submit"
                        disabled={isPending}
                        loading={isPending}
                        label="Log In"
                    />
                </form>

                <div className="flex items-center my-4">
                    <div className="flex-1 h-px bg-gray-300" />
                    <span className="px-2 text-gray-400 text-sm">OR</span>
                    <div className="flex-1 h-px bg-gray-300" />
                </div>

                <div className="flex justify-center text-black pt-4">
                    <Link to="/accounts/password/forgot" className="text-sm text-right cursor-pointer font-semibold">
                        Forgot password?
                    </Link>
                </div>
            </div>
        </Box>
    );
};

export default LoginForm;

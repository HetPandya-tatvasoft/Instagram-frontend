import { TextField } from '@mui/material'
import React, { useCallback } from 'react'
import { useFormik } from "formik";
import type { ResetPasswordPayload } from '../types/auth.type';
import useResetPassword from '../hooks/useResetPassword';
import { useSearchParams } from 'react-router-dom';
import { resetPasswordValidation } from '../validations/resetPasswordValidation';

const INITIAL_VALUES: ResetPasswordPayload = {
    token: "",
    password: "",
    confirmPassword: ""
};

const ResetPassword: React.FC = () => {

    const [searchParams] = useSearchParams();

    const token = searchParams.get("token") ?? "token";

    const { mutate, isPending, error } = useResetPassword();

    const handleSubmit = useCallback(
        (values: ResetPasswordPayload) => {
            mutate({ ...values, token }, {
                onError: () => { }
            }
            )
        }, [mutate, token]
    )

    const formik = useFormik({
        initialValues: INITIAL_VALUES,
        validationSchema: resetPasswordValidation,
        onSubmit: handleSubmit,
    });

    return (
        <>
            <div className="resetpass-main-container p-8">
                <div className="resetpass-heading mt-2 flex justify-center text-lg">
                    <h3 className='font-bold'>Create A Strong Password</h3>
                </div>
                <div className="w-full mt-2">
                    <p className="text-sm text-wrap text-center text-gray-500">
                        Password must be 8–15 characters long and include at least one uppercase letter, one lowercase letter, one number, and one special character (@,$,!,%,?,&).
                    </p>
                </div>
                <div className="forgotpass-form mt-4">
                    <div className="flex justify-center">
                        <form className='flex flex-col gap-4 w-full' onSubmit={formik.handleSubmit}>
                            <TextField
                                label="New Password"
                                type="password"
                                variant="outlined"
                                size="small"
                                id="passwordInputInstaForgotPass"
                                name="password"
                                fullWidth
                                value={formik.values.password}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                error={formik.touched.password && Boolean(formik.errors.password)}
                                helperText={formik.touched.password && formik.errors.password}
                            />
                            <TextField
                                label="New Password, again"
                                type="password"
                                variant="outlined"
                                size="small"
                                id="passwordAgainInputInstaForgotPass"
                                name="confirmPassword"
                                className="mt-4"
                                fullWidth
                                value={formik.values.confirmPassword}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                error={formik.touched.confirmPassword && Boolean(formik.errors.confirmPassword)}
                                helperText={formik.touched.confirmPassword && formik.errors.confirmPassword}
                            />
                            <button
                                type="submit"
                                disabled={isPending}
                                className="bg-[#0095f6] hover:bg-[#1877f2] text-white py-1 rounded-lg font-medium disabled:opacity-50 w-full mt-4"
                            >
                                {isPending ? "Resetting Password ..." : "Reset Password"}
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </>
    )
}

export default ResetPassword
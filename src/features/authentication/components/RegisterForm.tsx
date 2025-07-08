import { Box, FormHelperText, TextField } from "@mui/material"
import AuthFormPage from "../pages/AuthFormPage"
import instaLogo from "../../../assets/images/insta-text-logo.png";
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { DemoItem } from '@mui/x-date-pickers/internals/demo';

import * as Yup from "yup";
import { useFormik } from "formik";
import type { RegisterUserPayload } from "../types/auth.type";
import React, { useCallback } from "react";
import useRegister from "../register";
import dayjs from "dayjs";

const today = new Date();
const eighteenYearsAgo = new Date(
    today.getFullYear() - 18,
    today.getMonth(),
    today.getDate()
);

const VALIDATION_SCHEMA = Yup.object({
    email: Yup.string().email("Invalid email").required("Email is required"),
    password: Yup.string()
        .required("Password is required")
        .matches(
            /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,15}$/,
            "Password must be 8-15 characters, include uppercase, lowercase, number, and special character"
        ),
    fullName: Yup.string().required("Full name is required"),
    username: Yup.string()
        .min(3, "Username must be at least 3 characters")
        .required("Username is required"),
    contactNumber: Yup.string()
        .matches(/^[7-9][0-9]{9}$/, "Contact number must be 10 digits and should start from 7 - 10")
        .required("Contact number is required"),
    dateOfBirth: Yup.date()
        .max(eighteenYearsAgo, "You must be atleaest 18 years old.")
        .required("Date of birth is required"),
})

const INITIAL_VALUES: RegisterUserPayload = {
    email: "",
    password: "",
    fullName: "",
    username: "",
    contactNumber: "",
    dateOfBirth: null
}

const RegisterForm: React.FC = () => {

    const { mutate, isPending, error } = useRegister();

    const handleRegisterSubmit = useCallback(

        (values: RegisterUserPayload) => {

            const formattedDOB = values.dateOfBirth
                ? dayjs(values.dateOfBirth).format("YYYY-MM-DD")
                : ""

            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            mutate({ ...values, dateOfBirth: formattedDOB } as any, {
                onError: () => {
                    // Do some functions and all of them if needed
                }
            })
        },
        [mutate],
    );

    const formik = useFormik({
        initialValues: INITIAL_VALUES,
        validationSchema: VALIDATION_SCHEMA,
        onSubmit: handleRegisterSubmit
    })

    return (
        <>
            <AuthFormPage>
                <Box className=" flex items-center justify-center">
                    <div className=" p-8 w-full max-w-sm">
                        <div className="mb-8 flex flex-col items-center">
                            <img src={instaLogo} alt="Instagram" className="mx-auto mb-2 h-16" />

                            <div className="text-center px-3 ">
                                <span className="text-gray-600 font-semibold ">
                                    Sign up to see photos and videos from your friends.
                                </span>
                            </div>
                        </div>
                        <div className="flex items-center my-4">
                            <div className="flex-1 h-px bg-gray-300" />
                            <span className="px-2 text-gray-400 text-sm">OR</span>
                            <div className="flex-1 h-px bg-gray-300" />
                        </div>

                        <div className="">
                            <form onSubmit={formik.handleSubmit} className="flex flex-col gap-4">
                                <TextField
                                    label="Email"
                                    type="email"
                                    variant="outlined"
                                    size="small"
                                    id="emailInputInstaRegister"
                                    name="email"
                                    value={formik.values.email}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    error={formik.touched.email && Boolean(formik.errors.email)}
                                    helperText={formik.touched.email && formik.errors.email}
                                />
                                <TextField
                                    label="Password"
                                    type="password"
                                    variant="outlined"
                                    size="small"
                                    id="passwordInputInstaRegister"
                                    name="password"
                                    value={formik.values.password}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    error={formik.touched.password && Boolean(formik.errors.password)}
                                    helperText={formik.touched.password && formik.errors.password}
                                />
                                <TextField
                                    label="Full Name"
                                    type="text"
                                    variant="outlined"
                                    size="small"
                                    id="fullNameInputInstaRegister"
                                    name="fullName"
                                    value={formik.values.fullName}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    error={formik.touched.fullName && Boolean(formik.errors.fullName)}
                                    helperText={formik.touched.fullName && formik.errors.fullName}
                                />
                                <TextField
                                    label="User Name"
                                    type="text"
                                    variant="outlined"
                                    size="small"
                                    id="userNameInputInstaRegister"
                                    name="username"
                                    value={formik.values.username}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    error={formik.touched.username && Boolean(formik.errors.username)}
                                    helperText={formik.touched.username && formik.errors.username}
                                />

                                <TextField
                                    label="Contact Number"
                                    type="text"
                                    variant="outlined"
                                    size="small"
                                    id="contactNumberInputInstaRegister"
                                    name="contactNumber"
                                    value={formik.values.contactNumber}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    error={formik.touched.contactNumber && Boolean(formik.errors.contactNumber)}
                                    helperText={formik.touched.contactNumber && formik.errors.contactNumber}
                                />
                                <DemoItem>
                                    <DatePicker
                                        label="Date of Birth"
                                        value={formik.values.dateOfBirth}
                                        onChange={(date) => formik.setFieldValue('dateOfBirth', date)}
                                        slotProps={{
                                            textField: {
                                                id: 'dateOfBirthInputRegister',
                                                size: 'small',
                                                variant: 'outlined',
                                                onBlur: formik.handleBlur,
                                                error: formik.touched.dateOfBirth && Boolean(formik.errors.dateOfBirth),
                                            },
                                        }}

                                        name="dateOfBirth"
                                    />
                                </DemoItem>
                                {formik.touched.dateOfBirth && formik.errors.dateOfBirth && typeof formik.errors.dateOfBirth === 'string' && (
                                    <FormHelperText error>{formik.errors.dateOfBirth}</FormHelperText>
                                )}


                                <button
                                    type="submit"
                                    disabled={isPending}
                                    className="bg-[#4cb5f9] hover:bg-[#4099db] text-white py-1 rounded-lg font-medium disabled:opacity-50"
                                >
                                    {isPending ? "Registering.." : "Sign Up"}
                                </button>
                            </form>

                        </div>
                    </div>
                </Box>
            </AuthFormPage >
        </>
    )
}

export default RegisterForm
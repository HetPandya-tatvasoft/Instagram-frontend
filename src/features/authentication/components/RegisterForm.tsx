import { Box, FormHelperText, TextField, FormControl, InputLabel, Select, MenuItem, Grid, Stack } from "@mui/material"
import AuthFormPage from "../../../layouts/AuthenticationLayout"
import instaLogo from "../../../assets/images/insta-text-logo.png";

import * as Yup from "yup";
import { useFormik } from "formik";
import type { RegisterUserPayload } from "../types/auth.type";
import React, { useCallback, useState } from "react";
import useRegister from "../hooks/register";
import dayjs from "dayjs";
import localeData from 'dayjs/plugin/localeData';
import { checkUniqueEmail, checkUniqueUsername, checkUniqueContact } from "../authService";
import { ERROR_CODES } from "../../../common/constants/error";

const today = new Date();
const eighteenYearsAgo = new Date(
    today.getFullYear() - 18,
    today.getMonth(),
    today.getDate()
);

const MONTHS = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
];


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

const STEP_ONE_VALIDATION_SCHEMA = Yup.object().shape({
    email: Yup.string().email("Invalid email").required("Email is required")
        .test('unique-email', 'Email Already exists', async function (value) {
            if (!value) return false;
            try {
                await checkUniqueEmail(value);
                return true;
            } catch {
                return this.createError({ message: ERROR_CODES.ALREADY_EXISTS.EMAIL });
            }
        }),
    password: Yup.string()
        .required("Password is required")
        .matches(
            /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,15}$/,
            "Password must be 8-15 characters, include uppercase, lowercase, number, and special character"
        ),
    fullName: Yup.string().required("Full name is required"),
    username: Yup.string()
        .min(3, "Username must be at least 3 characters")
        .required("Username is required")
        .test('unique-username', 'Username Already exists', async function (value) {
            if (!value) return false;
            try {
                await checkUniqueUsername(value);
                return true;
            } catch {
                return this.createError({ message: ERROR_CODES.ALREADY_EXISTS.USERNAME });
            }
        }),
    contactNumber: Yup.string()
        .matches(/^[7-9][0-9]{9}$/, "Contact number must be 10 digits and should start from 7 - 10")
        .required("Contact number is required")
        .test('unique-contactNumber', 'Contact Number Already exists', async function (value) {
            if (!value) return false;
            try {
                await checkUniqueContact(value);
                return true;
            } catch {
                return this.createError({ message: ERROR_CODES.ALREADY_EXISTS.CONTACT_NUMBER });
            }
        }),
});

const STEP_TWO_VALIDATION_SCHEMA = Yup.object({
    day: Yup.number()
        .required("Day is required")
        .min(1, "Invalid day")
        .max(31, "Invalid day"),
    month: Yup.number()
        .required("Month is required")
        .min(1, "Invalid month")
        .max(12, "Invalid month"),
    year: Yup.number()
        .required("Year is required")
        .min(1900, "Invalid year")
        .max(today.getFullYear() - 18, "Alteast 18 years old"),
});

const INITIAL_VALUES = {
    email: "",
    fullName: "",
    username: "",
    password: "",
    contactNumber: "",
    day: 1,
    month: 1,
    year: new Date().getFullYear(),
};


const RegisterForm: React.FC = () => {

    // 1 -> User Details ; 2 -> Birth Date
    const [step, setStep] = useState<1 | 2>(1);

    const { mutate, isPending, error } = useRegister();

    const handleRegisterSubmit = useCallback(

        (values: typeof INITIAL_VALUES) => {

            // const formattedDOB = dayjs(`${values.year}-${values.month}-${values.day}`).format("YYYY-MM-DD");

            const dateOfBirth = new Date(Number(values.year), Number(values.month) - 1, Number(values.day));

            const formattedDOB = dayjs(dateOfBirth).format("YYYY-MM-DD");

            const payload: RegisterUserPayload = {
                email: values.email,
                fullName: values.fullName,
                username: values.username,
                password: values.password,
                contactNumber: values.contactNumber,
                dateOfBirth: formattedDOB,
            };

            mutate(payload, {
                onError: () => {
                    // Do some functions and all of them if needed
                }
            })
        },
        [mutate],
    );

    const formik = useFormik({
        initialValues: INITIAL_VALUES,
        validationSchema: step === 1 ? STEP_ONE_VALIDATION_SCHEMA : STEP_TWO_VALIDATION_SCHEMA,
        validateOnBlur: true,
        onSubmit: handleRegisterSubmit
    });

    const handleNext = async () => {
        const valid = await formik.validateForm();
        if (Object.keys(valid).length === 0) {
            setStep(2);
        }
        else {
            formik.setTouched({
                email: true,
                fullName: true,
                username: true,
                contactNumber: true,
                password: true,
            });
        }
    }

    return (
        <>

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
                            {step === 1 && (
                                <>
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

                                    <button
                                        onClick={handleNext}
                                        type="button"
                                        disabled={isPending}
                                        className="bg-[#4cb5f9] hover:bg-[#4099db] text-white py-1 rounded-lg font-medium disabled:opacity-50"
                                    >
                                        {isPending ? "Registering.." : "Sign Up"}
                                    </button>
                                </>
                            )}
                            {step === 2 && (
                                <>
                                    <div className="flex justify-between gap-2">
                                        {/* Day */}
                                        <FormControl
                                            error={formik.touched.day && Boolean(formik.errors.day)}
                                            size="small"
                                            className="w-20"
                                        >
                                            <InputLabel id="day-label">Day</InputLabel>
                                            <Select
                                                labelId="day-label"
                                                id="day"
                                                name="day"
                                                value={formik.values.day}
                                                onChange={formik.handleChange}
                                                onBlur={formik.handleBlur}
                                                label="Day"
                                                sx={{
                                                    fontSize: '0.85rem',
                                                    '.MuiSelect-select': {
                                                        display: 'flex',
                                                        alignItems: 'center',
                                                        overflow: 'hidden',
                                                        textOverflow: 'ellipsis',
                                                        whiteSpace: 'nowrap',
                                                    },
                                                }}
                                            >
                                                {[...Array(31)].map((_, i) => (
                                                    <MenuItem key={i + 1} value={i + 1}>
                                                        {i + 1}
                                                    </MenuItem>
                                                ))}
                                            </Select>
                                            {formik.touched.day && formik.errors.day && (
                                                <FormHelperText>{formik.errors.day}</FormHelperText>
                                            )}
                                        </FormControl>

                                        {/* Month */}
                                        <FormControl
                                            error={formik.touched.month && Boolean(formik.errors.month)}
                                            size="small"
                                            className="w-[120px]"
                                        >
                                            <InputLabel id="month-label">Month</InputLabel>
                                            <Select
                                                labelId="month-label"
                                                id="month"
                                                name="month"
                                                value={formik.values.month}
                                                onChange={formik.handleChange}
                                                onBlur={formik.handleBlur}
                                                label="Month"
                                                sx={{
                                                    fontSize: '0.85rem',
                                                    '.MuiSelect-select': {
                                                        display: 'flex',
                                                        alignItems: 'center',
                                                        overflow: 'hidden',
                                                        textOverflow: 'ellipsis',
                                                        whiteSpace: 'nowrap',
                                                    },
                                                }}
                                            >
                                                {MONTHS.map((month, i) => (
                                                    <MenuItem key={i} value={i + 1}>
                                                        {month}
                                                    </MenuItem>
                                                ))}
                                            </Select>
                                            {formik.touched.month && formik.errors.month && (
                                                <FormHelperText>{formik.errors.month}</FormHelperText>
                                            )}
                                        </FormControl>

                                        {/* Year */}
                                        <FormControl
                                            error={formik.touched.year && Boolean(formik.errors.year)}
                                            size="small"
                                            className="w-24"
                                        >
                                            <InputLabel id="year-label">Year</InputLabel>
                                            <Select
                                                labelId="year-label"
                                                id="year"
                                                name="year"
                                                value={formik.values.year}
                                                onChange={formik.handleChange}
                                                onBlur={formik.handleBlur}
                                                label="Year"
                                                sx={{
                                                    fontSize: '0.85rem',
                                                    '.MuiSelect-select': {
                                                        display: 'flex',
                                                        alignItems: 'center',
                                                        overflow: 'hidden',
                                                        textOverflow: 'ellipsis',
                                                        whiteSpace: 'nowrap',
                                                    },
                                                }}
                                            >
                                                {[...Array(100)].map((_, i) => {
                                                    const year = dayjs().year() - i;
                                                    return (
                                                        <MenuItem key={year} value={year}>
                                                            {year}
                                                        </MenuItem>
                                                    );
                                                })}
                                            </Select>
                                            {formik.touched.year && formik.errors.year && (
                                                <FormHelperText>{formik.errors.year}</FormHelperText>
                                            )}
                                        </FormControl>
                                    </div>

                                    {/* {formik.touched.dateOfBirth && formik.errors.dateOfBirth && typeof formik.errors.dateOfBirth === 'string' && (
                                            <FormHelperText error>{formik.errors.dateOfBirth}</FormHelperText>
                                        )} */}
                                    <button
                                        type="submit"
                                        disabled={isPending}
                                        className="bg-[#4cb5f9] hover:bg-[#4099db] text-white py-1 rounded-lg font-medium disabled:opacity-50"
                                    >
                                        {isPending ? "Registering.." : "Sign Up"}
                                    </button>
                                </>
                            )}
                        </form>
                    </div>
                </div>
            </Box>
        </>
    )
}

export default RegisterForm
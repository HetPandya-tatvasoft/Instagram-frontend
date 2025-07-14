import { useCallback, useState } from "react";
import MainLayout from "../../../layouts/MainLayout";
import * as Yup from "yup";
import { checkUniqueContact, checkUniqueEmail, checkUniqueUsername } from "../../authentication/authService";
import { ERROR_CODES } from "../../../common/constants/error";
import type { UpdateUserProfilePayload } from "../types/profile.types";
import { useFormik } from "formik";
import { FormHelperText, TextField, type SelectChangeEvent } from "@mui/material";
import FormikTextField from "../../../common/components/FormikTextField";
import React from "react";
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { useGetUserProfile } from "../hooks/useGetUserProfile";
import { useAppSelector } from "../../../app/redux/hooks";
import { useUpdateProfile } from "../hooks/useUpdateProfile";


const allowedGenders = ["male", "female", "custom", "prefer not to say"] as const;

type GenderType = typeof allowedGenders[number];

const getSafeGender = (value?: string): GenderType => {
    return allowedGenders.includes(value as GenderType) ? (value as GenderType) : "male";
};


const handleUpdateProfileFormSubmit = () => {
    // e.preventDefault();
    console.log("Hello the form has been submitted");

    // return true
}

const EditProfilePage: React.FC = () => {

    const { UserData } = useAppSelector((state) => state.userProfile);

    const { mutate, isPending } = useUpdateProfile();

    const handleProfileSubmit = useCallback(
        (values : UpdateUserProfilePayload) => {
            mutate(values);
        },
        [mutate]
    );

    const currentUserEmail = UserData?.email.toLowerCase();

    const currentUserUsername = UserData?.userName.toLowerCase();

    const currentUserMobile = UserData?.contactNo;

    const VALIDATION_SCHEMA = Yup.object({
        email: Yup.string().email("Invalid email").required("Email is required")
            .test('unique-email', 'Email Already exists', async function (value) {
                const { originalEmail } = this.options.context || {}
                if (!value) return false;
                try {
                    if (value.toLowerCase() == currentUserEmail) {
                        return true;
                    }
                    await checkUniqueEmail(value);
                    return true;
                } catch {
                    return this.createError({ message: ERROR_CODES.ALREADY_EXISTS.EMAIL });
                }
            }),
        fullName: Yup.string().required("Full name is required"),
        username: Yup.string()
            .min(3, "Username must be at least 3 characters")
            .required("Username is required")
            .test('unique-username', 'Username Already exists', async function (value) {
                if (!value) return false;
                try {
                    if (value.toLowerCase() == currentUserUsername) {
                        return true;
                    }
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
                    if (value.toLowerCase() == currentUserMobile) {
                        return true;
                    }
                    await checkUniqueContact(value);
                    return true;
                } catch {
                    return this.createError({ message: ERROR_CODES.ALREADY_EXISTS.CONTACT_NUMBER });
                }
            }),
        dateOfBirth: Yup.date()
            .max(new Date(), "Date of birth cannot be in the future")
            .required("Date of birth is required"),
        gender: Yup.string()
            .oneOf(["male", "female", "other"], "Select a valid gender")
            .required("Gender is required"),

        bio: Yup.string()
            .max(300, "Bio must be less than 300 characters")
            .nullable(),

        link: Yup.string()
            .url("Enter a valid URL")
            .nullable(),

        isPrivate: Yup.boolean()
    });


    const { data: userData, isLoading, error } = useGetUserProfile();

    const INITIAL_VALUES: UpdateUserProfilePayload = {
        fullName: userData?.fullName || "",
        email: userData?.email || "",
        username: userData?.userName || "",
        dateOfBirth: userData?.dob ? userData.dob.slice(0, 10) : "",
        contactNumber: userData?.contactNo || "",
        gender: getSafeGender(userData?.gender),
        isProfilePrivate: userData?.isPrivate || false,
        bio: userData?.bio || "",
        link: userData?.link || "",
    }

    const formik = useFormik({
        enableReinitialize: true,
        initialValues: INITIAL_VALUES,
        validationSchema: VALIDATION_SCHEMA,
        validateOnBlur: true,
        onSubmit: handleProfileSubmit,
    });

    const [gender, setGender] = useState('');

    const handleChangeGender = (event: SelectChangeEvent) => {
        setGender(event.target.value as string);
    };

    // const handleChange = (
    //     e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
    // ) => {
    //     const { name, value, type } = e.target;

    //     const newValue =
    //         type === "checkbox"
    //             ? (e.target as HTMLInputElement).checked
    //             : value;

    //     setFormData(prev => ({
    //         ...prev,
    //         [name]: newValue,
    //     }));
    // };

    // const handleSubmit = (e: React.FormEvent) => {
    //     e.preventDefault();
    //     console.log("Form Data: ", formData);
    //     // Send this to backend via mutation / API
    // };

    return (
        <>
            <MainLayout>
                <div className="min-h-screen bg-gradient-to-b from-indigo-50 to-white flex items-center justify-center px-4 py-12">
                    <div className="w-full max-w-3xl bg-white shadow-2xl rounded-2xl p-10 transition-all duration-300 ease-in-out">
                        <h2 className="text-3xl font-bold text-center text-black-700 mb-8">Update Profile</h2>

                        <form onSubmit={formik.handleSubmit} className="space-y-6">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                {/* Email */}
                                <FormikTextField
                                    label="Email"
                                    id="updateProfileEmail"
                                    name="email"
                                    value={formik.values.email ?? ""}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    error={formik.touched.email && Boolean(formik.errors.email)}
                                    helperText={formik.touched.email && formik.errors.email}
                                />

                                {/* Username */}
                                <FormikTextField
                                    label="Username"
                                    id="updateProfileUsername"
                                    name="username"
                                    value={formik.values.username ?? ""}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    error={formik.touched.username && Boolean(formik.errors.username)}
                                    helperText={formik.touched.username && formik.errors.username}
                                />

                                {/* Full Name */}
                                <FormikTextField
                                    label="Full Name"
                                    id="updateProfileFullName"
                                    name="fullName"
                                    value={formik.values.fullName ?? ""}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    error={formik.touched.fullName && Boolean(formik.errors.fullName)}
                                    helperText={formik.touched.fullName && formik.errors.fullName}
                                />

                                {/* Contact Number */}
                                <FormikTextField
                                    label="Contact Number"
                                    id="updateProfileContact"
                                    name="contactNumber"
                                    value={formik.values.contactNumber ?? ""}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    error={formik.touched.contactNumber && Boolean(formik.errors.contactNumber)}
                                    helperText={formik.touched.contactNumber && formik.errors.contactNumber}
                                />

                                {/* Date of Birth */}
                                <FormikTextField
                                    label="Date of Birth"
                                    id="updateProfileDob"
                                    name="dateOfBirth"
                                    type="date"
                                    value={formik.values.dateOfBirth ?? ""}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    error={formik.touched.dateOfBirth && Boolean(formik.errors.dateOfBirth)}
                                    helperText={formik.touched.dateOfBirth && formik.errors.dateOfBirth}
                                    shrinkLabel={true}
                                />

                                {/* Gender */}

                                <FormControl
                                    fullWidth
                                    error={formik.touched.gender && Boolean(formik.errors.gender)}
                                    className="mt-4"
                                >
                                    <InputLabel id="gender-label">Gender</InputLabel>
                                    <Select
                                        labelId="gender-label"
                                        id="gender"
                                        name="gender"
                                        value={formik.values.gender}
                                        label="Gender"
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                    >
                                        <MenuItem value="male">Male</MenuItem>
                                        <MenuItem value="female">Female</MenuItem>
                                        <MenuItem value="prefer not to say">Other</MenuItem>
                                    </Select>
                                    {formik.touched.gender && formik.errors.gender && (
                                        <FormHelperText>{formik.errors.gender}</FormHelperText>
                                    )}
                                </FormControl>

                                {/* Bio */}
                                <div className="md:col-span-2">
                                    <label htmlFor="bio" className="block mb-1 font-medium text-gray-700">Bio</label>
                                    <textarea
                                        id="bio"
                                        name="bio"
                                        value={formik.values.bio}
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                        rows={3}
                                        className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-300"
                                        placeholder="Tell us something about yourself"
                                    />
                                    {formik.touched.bio && formik.errors.bio && (
                                        <p className="text-red-500 text-sm mt-1">{formik.errors.bio}</p>
                                    )}
                                </div>

                                {/* Link */}
                                <FormikTextField
                                    label="Website / Link"
                                    id="updateProfileLink"
                                    name="link"
                                    type="url"
                                    value={formik.values.link ?? ''}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    error={formik.touched.link && Boolean(formik.errors.link)}
                                    helperText={formik.touched.link && formik.errors.link}
                                />

                                {/* Profile Privacy */}
                                <div className="flex items-center mt-2">
                                    <input
                                        id="isProfilePrivate"
                                        name="isProfilePrivate"
                                        type="checkbox"
                                        checked={formik.values.isProfilePrivate}
                                        onChange={formik.handleChange}
                                        className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                                    />
                                    <label htmlFor="isPrivate" className="ml-2 text-gray-700 font-medium">
                                        Make Profile Private
                                    </label>
                                </div>
                            </div>

                            {/* Submit */}
                            <div className="pt-4">
                                <button
                                    type="submit"
                                    className="w-full bg-[#FECEF1] hover:bg-[#DD7596] text-[#ff07b4] hover:text-white py-3 rounded-lg font-semibold transition shadow-md"
                                >
                                    Save Changes
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </MainLayout>

        </>
    );
};

export default EditProfilePage;
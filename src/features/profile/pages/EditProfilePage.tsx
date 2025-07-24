import { useCallback } from "react";
import MainLayout from "../../../layouts/MainLayout";
import type { IUpdateUserProfilePayload } from "../types/profile.types";
import { useFormik, type FormikHelpers } from "formik";
import { FormHelperText } from "@mui/material";
import FormikTextField from "../../../common/components/FormikTextField";
import React from "react";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { useGetUserProfile } from "../hooks/useGetUserProfile";
import { useUpdateProfile } from "../hooks/useUpdateProfile";
import { getUpdateProfileValidationSchema } from "../validations/updateProfileValidationSchema";
import { useAppSelector } from "../../../app/redux/hooks";
import { genderEnum } from "../../../common/enums/gender.enum";

type UpdateProfileFormContext = {
  currentUserEmail?: string;
  currentUserUsername?: string;
  currentUserMobile?: string;
};

// const allowedGenders = [
//   "male",
//   "female",
//   "custom",
//   "prefer not to say",
// ] as const;

const allowedGenders = Object.values(genderEnum);

type GenderType = (typeof allowedGenders)[number];

const getSafeGender = (value?: string): genderEnum => {
  return (Object.values(genderEnum) as string[]).includes(value ?? "")
    ? (value as genderEnum)
    : genderEnum.male; // default
};

const EditProfilePage: React.FC = () => {
  const { UserData } = useAppSelector((state) => state.userProfile);

  const currentUserEmail = UserData?.email.toLowerCase();

  const currentUserUsername = UserData?.userName.toLowerCase();

  const currentUserMobile = UserData?.contactNo;

  const { data: userData, isLoading, error } = useGetUserProfile();

  const { mutate, isPending } = useUpdateProfile();

  const handleProfileSubmit = useCallback(
    (values: IUpdateUserProfilePayload) => {
      mutate(values);
    },
    [mutate]
  );

  const INITIAL_VALUES: IUpdateUserProfilePayload = {
    fullName: userData?.fullName || "",
    email: userData?.email || "",
    username: userData?.userName || "",
    dateOfBirth: userData?.dob ? userData.dob.slice(0, 10) : "",
    contactNumber: userData?.contactNo || "",
    gender: getSafeGender(userData?.gender),
    isPrivate: userData?.isPrivate || false,
    bio: userData?.bio || "",
    link: userData?.link || "",
  };

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: INITIAL_VALUES,
    validationSchema: getUpdateProfileValidationSchema(
      currentUserEmail,
      currentUserUsername,
      currentUserMobile
    ),
    validateOnBlur: true,
    onSubmit: handleProfileSubmit,
  });

  return (
    <>
      <MainLayout>
        <div className="min-h-screen bg-gradient-to-b from-indigo-50 to-white flex items-center justify-center px-4 py-12">
          <div className="w-full max-w-3xl bg-white shadow-2xl rounded-2xl p-10 transition-all duration-300 ease-in-out">
            <h2 className="text-3xl font-bold text-center text-black-700 mb-8">
              Update Profile
            </h2>

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
                  error={
                    formik.touched.username && Boolean(formik.errors.username)
                  }
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
                  error={
                    formik.touched.fullName && Boolean(formik.errors.fullName)
                  }
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
                  error={
                    formik.touched.contactNumber &&
                    Boolean(formik.errors.contactNumber)
                  }
                  helperText={
                    formik.touched.contactNumber && formik.errors.contactNumber
                  }
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
                  error={
                    formik.touched.dateOfBirth &&
                    Boolean(formik.errors.dateOfBirth)
                  }
                  helperText={
                    formik.touched.dateOfBirth && formik.errors.dateOfBirth
                  }
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
                    <MenuItem value={genderEnum.male}>Male</MenuItem>
                    <MenuItem value={genderEnum.female}>Female</MenuItem>
                    <MenuItem value={genderEnum.preferNotToSay}>
                      Other
                    </MenuItem>
                  </Select>
                  {formik.touched.gender && formik.errors.gender && (
                    <FormHelperText>{formik.errors.gender}</FormHelperText>
                  )}
                </FormControl>

                {/* Bio */}
                <div className="md:col-span-2">
                  <label
                    htmlFor="bio"
                    className="block mb-1 font-medium text-gray-700"
                  >
                    Bio
                  </label>
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
                    <p className="text-red-500 text-sm mt-1">
                      {formik.errors.bio}
                    </p>
                  )}
                </div>

                {/* Link */}
                <FormikTextField
                  label="Website / Link"
                  id="updateProfileLink"
                  name="link"
                  type="url"
                  value={formik.values.link ?? ""}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={formik.touched.link && Boolean(formik.errors.link)}
                  helperText={formik.touched.link && formik.errors.link}
                />

                {/* Profile Privacy */}
                <div className="flex items-center mt-2">
                  <input
                    id="isPrivate"
                    name="isPrivate"
                    type="checkbox"
                    checked={formik.values.isPrivate}
                    onChange={formik.handleChange}
                    className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                  />
                  <label
                    htmlFor="isPrivate"
                    className="ml-2 text-gray-700 font-medium"
                  >
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

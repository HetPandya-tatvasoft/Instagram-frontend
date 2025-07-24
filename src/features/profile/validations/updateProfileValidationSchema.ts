import * as Yup from "yup";
import {
  checkUniqueContact,
  checkUniqueEmail,
  checkUniqueUsername,
} from "../../authentication/authService";
import { errorCodes } from "../../../common/constants/error";
import { validationMessages } from "../../../common/constants/validationMessages";
import { generalConsts } from "../../../common/constants/generalConsts";
import { regexConsts } from "../../../common/constants/regexConsts";

export const getUpdateProfileValidationSchema = (
  currentUserEmail?: string,
  currentUserUsername?: string,
  currentUserMobile?: string
) => {
  return Yup.object({
    email: Yup.string()
      .email(validationMessages.invalidValidation.emailInvalid)
      .required(validationMessages.requiredValidation.emailRequired)
      .test(generalConsts.uniqueEmail, validationMessages.alreadyExists.emailExists, async function (value) {
        if (!value) return false;
        try {
          if (value.toLowerCase() == currentUserEmail) {
            return true;
          }
          await checkUniqueEmail(value);
          return true;
        } catch {
          return this.createError({
            message: errorCodes.alreadyExists.email,
          });
        }
      }),
    fullName: Yup.string().required(validationMessages.requiredValidation.fullNameRequired),
    username: Yup.string()
      .min(3, validationMessages.regexValidation.usernameValidation)
      .required(validationMessages.requiredValidation.usernameRequired)
      .test(
        generalConsts.uniqueUsername,
        validationMessages.alreadyExists.usernameExists,
        async function (value) {
          if (!value) return false;
          try {
            if (value.toLowerCase() == currentUserUsername) {
              return true;
            }
            await checkUniqueUsername(value);
            return true;
          } catch {
            return this.createError({
              message: errorCodes.alreadyExists.userName,
            });
          }
        }
      ),
    contactNumber: Yup.string()
      .matches(
        regexConsts.contactNumberRegex,
        validationMessages.regexValidation.contactRegexValidation
      )
      .required(validationMessages.requiredValidation.contactNumberRequired)
      .test(
        generalConsts.uniqueContact,
        validationMessages.alreadyExists.contactExists,
        async function (value) {
          if (!value) return false;
          try {
            if (value.toLowerCase() == currentUserMobile) {
              return true;
            }
            await checkUniqueContact(value);
            return true;
          } catch {
            return this.createError({
              message: errorCodes.alreadyExists.contactNumber,
            });
          }
        }
      ),
    dateOfBirth: Yup.date()
      .max(new Date(), validationMessages.invalidValidation.dobNotInFuture)
      .required(validationMessages.requiredValidation.dobRequired),
    gender: Yup.string()
      .oneOf(["male", "female", "other", "prefer not to say"], validationMessages.invalidValidation.genderInvalid)
      .required(validationMessages.requiredValidation.genderRequired),

    bio: Yup.string()
      .max(300, validationMessages.regexValidation.bioRegexValidation)
      .nullable(),

    link: Yup.string().url(validationMessages.invalidValidation.url).nullable(),

    isPrivate: Yup.boolean(),
  });
};

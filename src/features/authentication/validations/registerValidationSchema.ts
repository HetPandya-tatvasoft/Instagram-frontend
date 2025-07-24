import * as Yup from "yup";
import {
  checkUniqueEmail,
  checkUniqueUsername,
  checkUniqueContact,
} from "../authService";
import { errorCodes } from "../../../common/constants/error";
import { validationMessages } from "../../../common/constants/validationMessages";
import { generalConsts } from "../../../common/constants/generalConsts";
import { regexConsts } from "../../../common/constants/regexConsts";

const today = new Date();

export const registerStepOneValidationSchema = Yup.object().shape({
  email: Yup.string()
    .email(validationMessages.invalidValidation.emailInvalid)
    .required(validationMessages.requiredValidation.emailRequired),
  // .test(
  //   generalConsts.uniqueEmail,
  //   validationMessages.alreadyExists.emailExists,
  //   async function (value) {
  //     if (!value) return false;
  //     try {
  //       await checkUniqueEmail(value);
  //       return true;
  //     } catch {
  //       return this.createError({
  //         message: errorCodes.alreadyExists.EMAIL,
  //       });
  //     }
  //   }
  // ),
  password: Yup.string()
    .required(validationMessages.requiredValidation.passwordRequired)
    .matches(
      regexConsts.passwordRegex,
      validationMessages.regexValidation.passwordRegexValidation
    ),
  fullName: Yup.string().required(
    validationMessages.requiredValidation.fullNameRequired
  ),
  username: Yup.string()
    .min(3, validationMessages.regexValidation.usernameValidation)
    .required(validationMessages.requiredValidation.usernameRequired),
  // .test(
  //   generalConsts.uniqueUsername,
  //   validationMessages.alreadyExists.usernameExists,
  //   async function (value) {
  //     if (!value) return false;
  //     try {
  //       await checkUniqueUsername(value);
  //       return true;
  //     } catch {
  //       return this.createError({
  //         message: errorCodes.alreadyExists.USERNAME,
  //       });
  //     }
  //   }
  // ),
  contactNumber: Yup.string()
    .matches(
      regexConsts.contactNumberRegex,
      validationMessages.regexValidation.contactRegexValidation
    )
    .required(validationMessages.requiredValidation.contactNumberRequired),
  // .test(
  //   generalConsts.uniqueContact,
  //   validationMessages.alreadyExists.contactExists,
  //   async function (value) {
  //     if (!value) return false;
  //     try {
  //       await checkUniqueContact(value);
  //       return true;
  //     } catch {
  //       return this.createError({
  //         message: errorCodes.alreadyExists.CONTACT_NUMBER,
  //       });
  //     }
  //   }
  // ),
});

export const registerStepTwoValidationSchema = Yup.object({
  day: Yup.number()
    .required(validationMessages.requiredValidation.dayRequired)
    .min(1, validationMessages.invalidValidation.invalidDay)
    .max(31, validationMessages.invalidValidation.invalidDay),
  month: Yup.number()
    .required(validationMessages.requiredValidation.monthRequired)
    .min(1, validationMessages.invalidValidation.invalidMonth)
    .max(12, validationMessages.invalidValidation.invalidMonth),
  year: Yup.number()
    .required(validationMessages.requiredValidation.yearRequired)
    .min(1900, validationMessages.invalidValidation.invalidYear)
    .max(
      today.getFullYear() - 18,
      validationMessages.invalidValidation.yearAtleast18
    ),
});

import * as Yup from "yup";
import { regexConsts } from "../../../common/constants/regexConsts";
import { validationMessages } from "../../../common/constants/validationMessages";
import { generalConsts } from "../../../common/constants/generalConsts";

export const resetPasswordValidationSchema = Yup.object({
  password: Yup.string()
    .required(validationMessages.requiredValidation.passwordRequired)
    .matches(
      regexConsts.passwordRegex,
      validationMessages.regexValidation.passwordRegexValidation
    ),
  confirmPassword: Yup.string()
    .required(validationMessages.requiredValidation.confirmPasswordRequired)
    .matches(
      regexConsts.passwordRegex,
      validationMessages.regexValidation.passwordRegexValidation
    )
    .oneOf(
      [Yup.ref(generalConsts.password)],
      validationMessages.invalidValidation.passwordMatching
    ),
});

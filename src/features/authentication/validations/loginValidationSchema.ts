import * as Yup from "yup";
import { validationMessages } from "../../../common/constants/validationMessages";
import { regexConsts } from "../../../common/constants/regexConsts";

export const loginValidationSchema = Yup.object({
  credential: Yup.string().required(
    validationMessages.requiredValidation.credentialRequired
  ),
  password: Yup.string()
    .required(validationMessages.requiredValidation.passwordRequired)
    .matches(
      regexConsts.passwordRegex,
      validationMessages.regexValidation.passwordRegexValidation
    ),
});

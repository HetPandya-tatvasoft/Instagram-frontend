import * as Yup from "yup";
import { validationMessages } from "../../../common/constants/validationMessages";

export const forgotPasswordValidationSchema = Yup.object({
    credential: Yup.string()
        .required(validationMessages.requiredValidation.credentialRequired),
})
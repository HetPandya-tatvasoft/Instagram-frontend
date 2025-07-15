import * as Yup from "yup";
import { validationMessages } from "../../../common/constants/validationMessages";

export const forgotPasswordValidation = Yup.object({
    credential: Yup.string()
        .required(validationMessages.requiredValidation.credentialRequired),
})
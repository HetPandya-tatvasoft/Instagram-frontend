import * as Yup from "yup";
import { validationMessages } from "../../../common/constants/validationMessages"

export const createPostValidationSchema = Yup.object({
  caption: Yup.string().required(validationMessages.requiredValidation.captionRequired),
  location: Yup.string().optional(),
});

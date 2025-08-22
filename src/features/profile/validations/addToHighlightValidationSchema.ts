import * as Yup from "yup";
import { validationMessages } from "../../../common/constants/validationMessages";

export const addToHighlightValidationSchema = Yup.object({
  title: Yup.string().required(
    validationMessages.requiredValidation.highlightTitleRequired
  ),
});

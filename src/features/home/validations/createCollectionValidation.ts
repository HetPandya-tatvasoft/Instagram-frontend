import * as Yup from "yup";
import { validationMessages } from "../../../common/constants/validationMessages";

export const createCollectionValidation = Yup.object({
    title : Yup.string().required(validationMessages.requiredValidation.collectionTitleRequired)
})
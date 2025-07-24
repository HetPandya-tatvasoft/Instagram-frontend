import * as Yup from "yup";

export const createStoryValidationSchema = Yup.object({
    caption : Yup.string(),
    isVisibleToClosedOnes : Yup.boolean(),
});
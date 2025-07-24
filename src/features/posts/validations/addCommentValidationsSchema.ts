import * as Yup from "yup";

export const addCommentValidationSchema = Yup.object({
  comment: Yup.string(),
});

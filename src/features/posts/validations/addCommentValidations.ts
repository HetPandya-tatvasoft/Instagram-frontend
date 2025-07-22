import * as Yup from "yup";

export const addCommentValidation = Yup.object({
  comment: Yup.string(),
});

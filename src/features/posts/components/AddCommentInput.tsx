import type { IAddCommentPayload } from "../../home/types/payload.types";
import FormikTextField from "../../../common/components/FormikTextField";
import { useFormik } from "formik";
import { addCommentValidationSchema } from "../validations/addCommentValidationsSchema";
import type { IAddCommentInputProps } from "../../home/types/home.types";
import { useCommentInPost } from "../../home/hooks/useCommentInPost";

const AddCommentInput: React.FC<IAddCommentInputProps> = ({ postId }) => {
  const { addComment } = useCommentInPost();

  const initialValues: IAddCommentPayload = {
    content: "",
    postId: postId,
    commentedByUserId: 0,
    commentId: 0,
  };

  const formik = useFormik({
    initialValues,
    validationSchema: addCommentValidationSchema,
    onSubmit: (values, { resetForm }) => {
      addComment(values);
      resetForm();
    },
  });

  return (
    <div className="border-t w-full">
      <form onSubmit={formik.handleSubmit}>
        <div className="flex gap-3">
          <FormikTextField
            label=""
            type="text"
            placeholder="Add a comment...."
            name="content"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            helperText={
              formik.touched.content && formik.errors.content
                ? formik.errors.content
                : ""
            }
            error={formik.touched.content && Boolean(formik.errors.content)}
            value={formik.values.content}
          />
          <button
            type="submit"
            className="bg-blue-500 text-white px-4 py-2 rounded-lg"
          >
            Post
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddCommentInput;

import { useFormik } from "formik";
import type { addCommentPayload } from "../types/comment.types";

const initialValues : addCommentPayload = {
    commentContent : ""
}

const AddCommentInput: React.FC = () => {



    // const formik = useFormik({

    // })

  return (
    <>
      <h3>This is the add comment input section</h3>
    </>
  );
};

export default AddCommentInput;

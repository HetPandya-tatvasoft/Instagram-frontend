import React, { useCallback, useState } from "react";
import CenterModalLayout from "../../layouts/CenterModalLayout";
import FormikTextField from "./FormikTextField";
import { useFormik } from "formik";
import { createPostValidationSchema } from "../../features/posts/validations/createPostValidationsSchema";
import { TextField } from "@mui/material";
import toast from "react-hot-toast";
import { useCreatePost } from "../../features/posts/hooks/useCreatePost";
import { IpostFields } from "../../features/home/types/home.types";
import { ICreatePostModalProps } from "../../features/home/types/homeProps.types";

const initialValues: IpostFields = {
  caption: "",
  location: "",
};

const CreatePostModal: React.FC<ICreatePostModalProps> = ({
  isOpen,
  onClose,
  handlePost,
}) => {
  const [files, setFiles] = useState<File[]>([]);

  const [currentIndex, setCurrentIndex] = useState(0);

  const { mutate: createPost, isPending } = useCreatePost();

  // const handlePostCreationSubmit = useCallback(() => {
  //   if (files.length === 0) {
  //     toast.error("Please upload alteast one image");
  //     return;
  //   }

  //   const formData = new FormData();

  //   files.forEach((file) => {
  //     formData.append("Posts", file);
  //   });

  //   formData.append("Caption", formik.values.caption);
  //   formData.append("Location", formik.values.location);
  //   formData.append("PostedByUserId", "1");
  //   formData.append("PostType", "post");
  //   formData.append("IsVisibleToClosedOnes", "false");

  //   for (const pair of formData.entries()) {
  //     console.log(`${pair[0]}:`, pair[1]);
  //   }

  //   createPost(formData);
  //   onClose();
  // }, [createPost, files, onClose]);

  const formik = useFormik({
    initialValues: initialValues,
    validationSchema: createPostValidationSchema,
    onSubmit: (values) => {
      if (files.length === 0) {
        toast.error("Please upload alteast one image");
        return;
      }

      const formData = new FormData();

      files.forEach((file) => {
        formData.append("Posts", file);
      });

      formData.append("Caption", formik.values.caption);
      formData.append("Location", formik.values.location);
      formData.append("PostedByUserId", "1");
      formData.append("PostType", "post");
      formData.append("IsVisibleToClosedOnes", "false");

      createPost(formData);
      onClose();
    },
  });

  const handleFileChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      if (e.target.files) {
        const selectedFiles = Array.from(e.target.files);
        setFiles(selectedFiles);
        setCurrentIndex(0);
      }
    },
    []
  );

  const handleNext = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % files.length);
  }, [files.length]);

  const handlePrev = useCallback(() => {
    setCurrentIndex((prev) => (prev - 1 + files.length) % files.length);
  }, [files.length]);

  const resetModal = useCallback(() => {
    setFiles([]);
    setCurrentIndex(0);
    formik.resetForm();
  }, [formik]);

  const handleCloseModal = useCallback(() => {
    resetModal();
    onClose();
  }, [onClose, resetModal]);

  return (
    <CenterModalLayout isOpen={isOpen} onClose={handleCloseModal}>
      <div className="bg-white rounded-xl w-full max-w-xl mx-4 overflow-hidden">
        <form onSubmit={formik.handleSubmit} encType="multipart/form-data">
          <div className="border-b px-4 py-3 text-center font-semibold">
            Create New Post
          </div>

          {files.length === 0 ? (
            <div className="p-6 text-center">
              <label className="cursor-pointer block">
                <input
                  type="file"
                  accept="image/*"
                  hidden
                  multiple
                  onChange={handleFileChange}
                />
                <div className="border border-dashed border-gray-400 p-10 rounded-lg">
                  <p className="text-gray-600">Click to upload images</p>
                </div>
              </label>
            </div>
          ) : (
            <div className="p-4 text-center">
              <div className="relative w-full h-64">
                <img
                  src={URL.createObjectURL(files[currentIndex])}
                  alt={`Preview ${currentIndex + 1}`}
                  className="w-full h-full rounded object-contain overflow-scroll"
                />
                {files.length > 1 && (
                  <>
                    <button
                      type="button"
                      onClick={handlePrev}
                      className="absolute top-1/2 left-2 transform -translate-y-1/2 bg-white/70 px-2 py-1 rounded-full"
                    >
                      ◀
                    </button>
                    <button
                      type="button"
                      onClick={handleNext}
                      className="absolute top-1/2 right-2 transform -translate-y-1/2 bg-white/70 px-2 py-1 rounded-full"
                    >
                      ▶
                    </button>
                  </>
                )}
              </div>

              <div className="mt-3">
                <FormikTextField
                  type="text"
                  label="Location"
                  helperText={formik.touched.location && formik.errors.location}
                  value={formik.values.location}
                  error={
                    formik.touched.location && Boolean(formik.errors.location)
                  }
                  name="location"
                  id="locationFieldCreateStory"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />

                <div className="mt-3"></div>

                <TextField
                  label="Caption"
                  multiline
                  rows={4}
                  name="caption"
                  value={formik.values.caption}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={
                    formik.touched.caption && Boolean(formik.errors.caption)
                  }
                  helperText={formik.touched.caption && formik.errors.caption}
                  variant="outlined"
                  fullWidth
                />

                <div className="mt-4 flex justify-between">
                  <button
                    className="px-4 py-2 bg-gray-200 text-gray-700 rounded"
                    onClick={onClose}
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 bg-blue-500 text-white rounded"
                  >
                    Share
                  </button>
                </div>
              </div>
            </div>
          )}
        </form>
      </div>
    </CenterModalLayout>
  );
};

export default CreatePostModal;

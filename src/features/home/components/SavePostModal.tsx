import React, { useState, useEffect, useCallback } from "react";
import { ISavePostModalProps } from "../types/homeProps.types";
import { useGetCollections } from "../hooks/useGetCollections";
import {
  ICollectionCreatePayload,
  ICollectionUpsertPayload,
} from "../types/payload.types";
import { useFormik } from "formik";
import { createCollectionValidation } from "../validations/createCollectionValidation";
import toast from "react-hot-toast";
import FormikTextField from "../../../common/components/FormikTextField";
import { useCreateNewCollection } from "../hooks/useCreateNewCollection";
import { ICollectionResponse, IPost, IPostResponse } from "../types/home.types";
import { useUpsertCollection } from "../hooks/useUpsertCollection";
import { useRemovePostFromCollection } from "../hooks/useRemovePostFromCollection";

const SavePostModal: React.FC<ISavePostModalProps> = ({ onClose, postId }) => {
  const [selectedCollection, setSelectedCollection] = useState<string | null>(
    null
  );

  const { data: userCollections } = useGetCollections();

  const { createNewCollection } = useCreateNewCollection();

  const { upsertCollection } = useUpsertCollection();

  const { removePostsFromCollection } = useRemovePostFromCollection();

  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", handleEsc);
    return () => document.removeEventListener("keydown", handleEsc);
  }, [onClose]);

  const initialValues: ICollectionCreatePayload = {
    title: "",
    userId: 0,
    postId: postId,
  };

  const formik = useFormik({
    initialValues: initialValues,
    validationSchema: createCollectionValidation,
    onSubmit: (values, { resetForm }) => {
      createNewCollection(values);
      onClose();
      resetForm();
    },
  });


  const savePostToCollection = useCallback(
    (postId: number, collection: ICollectionResponse) => {
      const upsertCollectionPayload: ICollectionUpsertPayload = {
        collectionId: collection.collectionId,
        postId: postId,
      };

      upsertCollection(upsertCollectionPayload);
      onClose();
    },
    [onClose, upsertCollection]
  );

  const isPostAlreadyInCollection = useCallback(
    (collection: ICollectionResponse, postId: number) => {
      return collection.savedPostsCollection.some(
        (post: IPostResponse) => post.postId === postId
      );
    },
    []
  );

  const togglePostInCollection = useCallback(
    (postId: number, collection: ICollectionResponse) => {
      const isAlreadySaved = isPostAlreadyInCollection(collection, postId);

      if (isAlreadySaved) {
        const removePostFromCollectionPayload = {
          postId: [postId],
          collectionId: collection.collectionId,
        };

        removePostsFromCollection(removePostFromCollectionPayload);
        toast.success(`Removed from ${collection.title}`);
      } else {
        savePostToCollection(postId, collection);
      }
    },
    [isPostAlreadyInCollection, removePostsFromCollection, savePostToCollection]
  );

  return (
    <div
      className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-black/40"
      onClick={onClose}
    >
      <div
        className="bg-white w-full sm:w-[400px] rounded-t-2xl sm:rounded-xl p-4 max-h-[60%] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        <h2 className="text-lg font-semibold mb-3">Save to Collection</h2>

        {/* Collections */}
        <div className="flex-1 overflow-y-auto scrollbar-hidden border-b pb-3">
          {userCollections != null &&
          userCollections.data.records.length > 0 ? (
            userCollections.data.records.map(
              (collection: ICollectionResponse, index) => {
                const alreadySaved = isPostAlreadyInCollection(
                  collection,
                  postId
                );

                return (
                  <div
                    key={index}
                    onClick={() => {
                      togglePostInCollection(postId, collection);
                    }}
                    className={`p-3 rounded cursor-pointer mb-2 ${
                      alreadySaved
                        ? "bg-green-100 border border-green-400 cursor-not-allowed"
                        : selectedCollection === collection.title
                        ? "bg-blue-100 border border-blue-400"
                        : "bg-gray-100 hover:bg-gray-200"
                    }`}
                  >
                    <div className="flex justify-between items-center">
                      <span>{collection.title}</span>
                      {alreadySaved && (
                        <span className="text-xs text-green-700 font-medium">
                          Already Saved
                        </span>
                      )}
                    </div>
                  </div>
                );
              }
            )
          ) : (
            <p className="text-gray-500 text-sm">No collections yet.</p>
          )}
        </div>

        {/* Create new collection */}
        <div className="pt-3">
          <h3 className="font-medium mb-2">Create New Collection</h3>
          <form onSubmit={formik.handleSubmit}>
            <div className="flex gap-2">
              <FormikTextField
                type="text"
                label="Collection Title"
                value={formik.values.title}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                helperText={formik.touched.title && formik.errors.title}
                error={formik.touched.title && Boolean(formik.errors.title)}
                placeholder="Collection Name"
                name="title"
                className="flex-1 px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-300"
              />
              <button type="submit">Create</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SavePostModal;

import React from "react";
import { DeleteConfirmationModalProps } from "../types/commonProps.type";
import { TriangleAlert, X } from "lucide-react";
import { useDeletePost } from "../../features/posts/hooks/useDeletePost";
import { deleteItemEnum } from "../enums/deleteItem.enum";

export const DeleteConfirmationModal: React.FC<
  DeleteConfirmationModalProps
> = ({ onClose, id, deleteItem }) => {
  const { deletePost } = useDeletePost();

  const handleDelete = (id: number) => {
    switch (deleteItem) {
      case deleteItemEnum.deletePost:
        deletePost(id);
        break;
      default:
        console.warn("Unknown delete type");
    }
    onClose();
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-black/40"
      onClick={onClose}
    >
      <div
        className="bg-white w-full sm:w-[400px] rounded-t-2xl sm:rounded-xl p-6 shadow-lg max-h-[60%] flex flex-col animate-fadeIn"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between border-b pb-3">
          <div className="flex items-center gap-2">
            <TriangleAlert className="text-yellow-500" size={22} />
            <h5 className="text-lg font-semibold text-gray-800">
              Delete Confirmation
            </h5>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-full hover:bg-gray-100 transition"
          >
            <X size={20} className="text-gray-500 hover:text-gray-700" />
          </button>
        </div>

        {/* Body */}
        <div className="mt-4 text-gray-600 text-sm">
          Are you sure you want to delete{" "}
          <span className="font-semibold text-gray-800">{deleteItem}</span>?
        </div>

        {/* Footer */}
        <div className="mt-6 flex justify-end gap-3">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-lg text-sm font-medium border border-gray-300 text-gray-600 hover:bg-gray-100 transition"
          >
            No, Don’t delete
          </button>
          <button
            onClick={() => handleDelete(id)}
            className="px-4 py-2 rounded-lg text-sm font-medium bg-red-500 text-white hover:bg-red-600 shadow-sm transition"
          >
            Yes, Delete
          </button>
        </div>
      </div>
    </div>
  );
};

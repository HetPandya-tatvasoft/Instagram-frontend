import React, { useState, useEffect } from "react";
import { IHighlightResponse } from "../../home/types/home.types";
import { IUpdateHighlightPayload } from "../types/profile.payload.types";

interface EditHighlightModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (highlighData: IUpdateHighlightPayload) => void;
  highlight: IHighlightResponse;
}

const EditHighlightModal: React.FC<EditHighlightModalProps> = ({
  isOpen,
  onClose,
  onSave,
  highlight,
}) => {
  const [title, setTitle] = useState(highlight.title);

  useEffect(() => {
    if (isOpen) setTitle(highlight.title);
  }, [isOpen, highlight.title]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/40 flex justify-center items-center z-50">

      <div className="bg-white rounded-lg p-6 w-80 space-y-4 shadow-xl">
        <h2 className="text-lg font-semibold">Edit Highlight</h2>
        <input
          className="w-full border border-gray-300 rounded px-3 py-2"
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <div className="flex justify-end space-x-2">
          <button
            onClick={onClose}
            className="px-3 py-1 text-sm bg-gray-200 rounded hover:bg-gray-300"
          >
            Cancel
          </button>
          <button
            onClick={() => onSave({highlightId : highlight.highlightId, title : title})}
            className="px-3 py-1 text-sm bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditHighlightModal;

import React, { useState, useEffect } from "react";
import { ISavePostModalProps } from "../types/homeProps.types";

const SavePostModal: React.FC<ISavePostModalProps> = ({
  onClose,
  collections,
  onSaveToCollection,
  onCreateCollection,
}) => {
  const [newCollectionName, setNewCollectionName] = useState("");
  const [selectedCollection, setSelectedCollection] = useState<string | null>(null);

  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", handleEsc);
    return () => document.removeEventListener("keydown", handleEsc);
  }, [onClose]);

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
          {collections.length > 0 ? (
            collections.map((collection, index) => (
              <div
                key={index}
                onClick={() => {
                  setSelectedCollection(collection);
                  onSaveToCollection(collection);
                  onClose();
                }}
                className={`p-3 rounded cursor-pointer mb-2 ${
                  selectedCollection === collection
                    ? "bg-blue-100 border border-blue-400"
                    : "bg-gray-100 hover:bg-gray-200"
                }`}
              >
                {collection}
              </div>
            ))
          ) : (
            <p className="text-gray-500 text-sm">No collections yet.</p>
          )}
        </div>

        {/* Create new collection */}
        <div className="pt-3">
          <h3 className="font-medium mb-2">Create New Collection</h3>
          <div className="flex gap-2">
            <input
              type="text"
              value={newCollectionName}
              onChange={(e) => setNewCollectionName(e.target.value)}
              placeholder="Collection Name"
              className="flex-1 px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-300"
            />
            <button
              onClick={() => {
                if (newCollectionName.trim() !== "") {
                  onCreateCollection(newCollectionName.trim());
                  setNewCollectionName("");
                }
              }}
              disabled={newCollectionName.trim() === ""}
              className={`px-4 py-2 rounded text-white transition ${
                newCollectionName.trim() === ""
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-blue-500 hover:bg-blue-600"
              }`}
            >
              Create
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SavePostModal;

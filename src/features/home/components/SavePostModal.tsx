import React, { useState } from "react";

interface SavePostModalProps {
  onClose: () => void;
  collections: string[];
  onSaveToCollection: (collectionName: string) => void;
  onCreateCollection: (newCollection: string) => void;
}

const SavePostModal: React.FC<SavePostModalProps> = ({
  onClose,
  collections,
  onSaveToCollection,
  onCreateCollection,
}) => {
  const [newCollectionName, setNewCollectionName] = useState("");

  return (
    <div
      className="bg-white w-full sm:w-[400px] mx-auto rounded-t-2xl p-4 max-h-[40%] fixed inset-0 scrollbar-hidden bg-opacity-0 flex items-end z-50"
      onClick={onClose}
    >
      <div
        className="bg-white w-full rounded-t-2xl p-4 max-h-[60%] overflow-y-auto"
        onClick={(e) => e.stopPropagation()} // Prevent close on inner click
      >
        <h2 className="text-lg font-semibold mb-4">Save to Collection</h2>

        <div className="space-y-2 mb-4">
          {collections.map((collection, index) => (
            <div
              key={index}
              onClick={() => {
                onSaveToCollection(collection);
                onClose();
              }}
              className="p-3 bg-gray-100 rounded cursor-pointer hover:bg-gray-200"
            >
              {collection}
            </div>
          ))}
        </div>

        <div className="mt-4 border-t pt-4">
          <h3 className="font-medium mb-2">Create New Collection</h3>
          <div className="flex gap-2">
            <input
              type="text"
              value={newCollectionName}
              onChange={(e) => setNewCollectionName(e.target.value)}
              placeholder="Collection Name"
              className="flex-1 px-3 py-2 border rounded"
            />
            <button
              onClick={() => {
                if (newCollectionName.trim() !== "") {
                  onCreateCollection(newCollectionName.trim());
                  setNewCollectionName("");
                }
              }}
              className="px-4 py-2 bg-blue-500 text-white rounded"
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

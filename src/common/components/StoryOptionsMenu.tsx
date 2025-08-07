import React, { useState } from "react";
import { MoreVertical } from "lucide-react";
import { IStoryOptionsMenuProps } from "../types/commonComponent.type";



const StoryOptionsMenu: React.FC<IStoryOptionsMenuProps> = ({
  isOwnProfile,
  onSave,
  onAddToHighlights,
  onDelete,
  fromHighligts = false,
  handleRemoveStoryFromHighlights
}) => {
  const [showOptions, setShowOptions] = useState(false);

  return (
    <div>
      <button
        onClick={() => setShowOptions((prev) => !prev)}
        className="p-2 bg-black/50 rounded-full"
      >
        <MoreVertical size={20} />
      </button>

      {showOptions && (
        <div className="absolute bottom-10 right-0 bg-white text-black rounded-md shadow-lg w-40 text-sm">
          <button
            className="w-full text-left px-4 py-2 hover:bg-gray-100 cursor-pointer"
            onClick={() => {
              onSave();
              setShowOptions(false);
            }}
          >
            Save
          </button>
          {isOwnProfile && (
            <>
              {!fromHighligts && (
                <>
                  <button
                    className="w-full text-left px-4 py-2 hover:bg-gray-100 cursor-pointer"
                    onClick={() => {
                      onAddToHighlights();
                      setShowOptions(false);
                    }}
                  >
                    Add to Highlights
                  </button>
                  <button
                    className="w-full text-left px-4 py-2 hover:bg-red-100 text-red-600 cursor-pointer"
                    onClick={() => {
                      onDelete();
                      setShowOptions(false);
                    }}
                  >
                    Delete
                  </button>
                </>
              )}
              {fromHighligts && handleRemoveStoryFromHighlights && (
                <button 
                className="w-full text-left px-4 py-2 hover:bg-gray-100 cursor-pointer"
                onClick={() => handleRemoveStoryFromHighlights()}
                >
                  Remove from Highlights
                </button>
              )}
            </>
          )}
        </div>
      )}
    </div>
  );
};

export default StoryOptionsMenu;

import { useMemo } from "react";
import { getBase64ImageUrl } from "../../../utils/getBase64Image";
import { IStoryItemProps } from "../types/homeProps.types";

const StoryItem: React.FC<IStoryItemProps> = ({ story }) => {

  const borderStyle = useMemo(() => {
    return {
      background: `conic-gradient(#ff0050 0deg 360deg)`,
    };
  }, []);

  return (
    <div className="flex flex-col items-center space-y-1 cursor-pointer">
      {/* Outer ring */}
      <div className="relative w-20 h-20 rounded-full" style={borderStyle}>
        <div className="absolute inset-1 rounded-full bg-white flex items-center justify-center">
          {/* Profile Image */}
          <img
            src={getBase64ImageUrl(story.storyResponses[0].mediaUrlBase64)}
            alt={story.userName}
            className="w-16 h-16 object-cover rounded-full"
          />
        </div>
      </div>

      <span className="text-xs text-gray-600 max-w-[70px] truncate">
        {story.userName}
      </span>
    </div>
  );
};

export default StoryItem;

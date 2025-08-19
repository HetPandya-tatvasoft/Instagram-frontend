import { getBase64ImageUrl } from "../../../utils/getBase64Image";
import { IStoryFollowingList } from "../types/home.types";
import { IStoryItemProps } from "../types/homeProps.types";

const StoryItem: React.FC<IStoryItemProps> = ({ story }) => {
  const storyCount = 10;

  const segments = Array.from({ length: storyCount }, (_, i) => {
    const angle = 360 / storyCount;
    const gap = 2;
    const start = i * angle;
    const end = start + angle;

    return `
      #ff0050 ${start}deg ${end - gap}deg, 
      transparent ${end - gap}deg ${end}deg
    `;
  }).join(", ");

  const borderStyle = {
    background: `conic-gradient(${segments})`,
  };

  return (
    <div className="flex flex-col items-center space-y-1 cursor-pointer">
      {/* Outer ring */}
      <div className="relative w-20 h-20 rounded-full" style={borderStyle}>
        {/* White circle inside to create border spacing */}
        <div className="absolute inset-1 rounded-full bg-white flex items-center justify-center">
          {/* Profile Image */}
          <img
            src={getBase64ImageUrl(story.storyResponses[0].mediaUrlBase64)}
            alt={story.userName}
            className="w-16 h-16 object-cover rounded-full"
          />
        </div>
      </div>

      {/* Username */}
      <span className="text-xs text-gray-600 max-w-[70px] truncate">
        {story.userName}
      </span>
    </div>
  );
};

export default StoryItem;

import { getBase64ImageUrl } from "../../../utils/getBase64Image";
import { IStoryFollowingList, IStoryResponse } from "../types/home.types";

interface IUser {
  id: string;
  username: string;
  profilePicture: string;
  isVerified?: boolean;
}

interface IStory {
  id: string;
  user: IUser;
  image: string;
  isViewed: boolean;
}

interface IStoryItemProps {
  story: IStoryFollowingList;
};

const StoryItem: React.FC<IStoryItemProps> = ({ story }) => {
  return (
    <div className="flex flex-col items-center soace-y-1 cursor-pointer">
      <div
        className={`p-0.5 rounded-full bg-gradient-to-tr from-yellow-400 to-pink-600`}
      >
        <div className="bg-white p-0.5 rounded-full">
          <img
            src={getBase64ImageUrl(story.storyResponses[0].mediaUrlBase64)}
            alt={story.userName}
            className="w-14 h-14 rounded-full object-cover"
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

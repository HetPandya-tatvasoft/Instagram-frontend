interface User {
  id: string;
  username: string;
  profilePicture: string;
  isVerified?: boolean;
}

interface Story {
  id: string;
  user: User;
  image: string;
  isViewed: boolean;
}

interface StoryItemProps {
  story: Story;
};

const StoryItem: React.FC<StoryItemProps> = ({ story }) => {
  return (
    <div className="flex flex-col items-center soace-y-1 cursor-pointer">
      <div
        className={`p-0.5 rounded-full bg-gradient-to-tr from-yellow-400 to-pink-600`}
      >
        <div className="bg-white p-0.5 rounded-full">
          <img
            src={story.image}
            alt={story.user.username}
            className="w-14 h-14 rounded-full object-cover"
          />
        </div>
      </div>
      <span className="text-xs text-gray-600 max-w-[70px] truncate">
        {story.user.username}
      </span>
    </div>
  );
};

export default StoryItem;

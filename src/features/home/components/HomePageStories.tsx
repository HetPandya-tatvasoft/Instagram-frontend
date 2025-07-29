import { Plus } from "lucide-react";
import StoryItem from "../components/StoryItem";
import { useCallback, useState } from "react";
import CreateStoryModal from "../../../common/components/CreateStoryModal";
import { IStoryFollowingList, IStoryResponse } from "../types/home.types";
import StoryViewer from "./StoryViewer";
import { getUserIdFromToken } from "../../../utils/jwt.utils";

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

interface StoriesProps {
  stories: IStoryFollowingList[];
}

const HomePageStories: React.FC<StoriesProps> = ({ stories }) => {
  const loggedInUserId = getUserIdFromToken();

  const [openCreateStoryModal, setOpenCreateStoryModal] = useState(false);

  const [openStoryViewer, setOpenStoryViewer] = useState(false);

  const [activeUserStories, setActiveUserStories] = useState<
    IStoryResponse[] | null
  >(null);

  const [initialIndex, setInitialIndex] = useState(0);

  const handleStoryClick = useCallback(
    (userStories: IStoryResponse[], fromProfile: boolean = false) => {
      let startIndex = 0;

      if (!fromProfile) {
        const firstUnviewedIndex = userStories.findIndex(
          (story) =>
            story.isSeen == false
        );
        console.log(`Hello het below is the important information : `)
        console.log(`The story first which is not seen is ${firstUnviewedIndex}`);
        if (firstUnviewedIndex !== -1) {
          startIndex = firstUnviewedIndex;
          setInitialIndex(firstUnviewedIndex);
        }
      }

      setActiveUserStories(userStories);
      setOpenStoryViewer(true);
    },
    [setOpenStoryViewer]
  );

  const mockCurrentUser: IUser = {
    id: "1",
    username: "your_username",
    profilePicture:
      "https://images.unsplash.com/photo-1648884266836-517ad583e720?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mjh8fHJhbmRvbSUyMHBlb3BsZXxlbnwwfHwwfHx8MA%3D%3D",
  };

  return (
    <div className="bg-white border border-gray-200 rounded-lg p-4 mb-4 ">
      <div className="flex space-x-4 overflow-x-auto scrollbar-hidden">
        <div
          onClick={() => setOpenCreateStoryModal(true)}
          className="flex flex-col items-center space-y-1 cursor-pointer flex-shrink-0"
        >
          <div className="relative">
            <div className="rounded-full p-0.5 bg-white">
              <img
                src={mockCurrentUser.profilePicture}
                className="w-14 h-14 rounded-full object-cover"
                alt="Your Story"
              />
            </div>
            <div className="absolute -bottom-1 -right-1 bg-blue-500 text-white rounded-full w-6 h-6 flex items-center justify-center">
              <Plus />
            </div>
          </div>
          <span className="text-xs text-gray-800">Your story</span>
        </div>

        {stories &&
          stories.map((story: IStoryFollowingList) => (
            <div
              key={story.userId}
              className="flex-shrink-0"
              onClick={() => handleStoryClick(story.storyResponses)}
            >
              <StoryItem story={story} />
            </div>
          ))}
        {openStoryViewer && activeUserStories && (
          <StoryViewer
            stories={activeUserStories}
            onClose={() => setOpenStoryViewer(false)}
            initialIndex={initialIndex}
          />
        )}
      </div>
      <CreateStoryModal
        isOpen={openCreateStoryModal}
        onClose={() => setOpenCreateStoryModal(false)}
      />
    </div>
  );
};

export default HomePageStories;

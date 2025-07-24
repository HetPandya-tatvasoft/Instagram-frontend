import { Plus } from "lucide-react";
import StoryItem from "../components/StoryItem";
import { useState } from "react";
import CreateStoryModal from "../../../common/components/CreateStoryModal";
import { IStoryFollowingList, IStoryResponse } from "../types/home.types";
import StoryViewer from "./StoryViewer";

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
  const [openCreateStoryModal, setOpenCreateStoryModal] = useState(false);

  const [openStoryViewer, setOpenStoryViewer] = useState(false);

  const [activeUserStories, setActiveUserStories] =
    useState<IStoryResponse[] | null>(null);

  const handleStoryClick = (userStories: IStoryResponse[]) => {
    setActiveUserStories(userStories);
    setOpenStoryViewer(true);
  };

  const mockCurrentUser: IUser = {
    id: "1",
    username: "your_username",
    profilePicture:
      "https://images.unsplash.com/photo-1648884266836-517ad583e720?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mjh8fHJhbmRvbSUyMHBlb3BsZXxlbnwwfHwwfHx8MA%3D%3D",
  };

  const mockStories: IStory[] = [
    {
      id: "1",
      user: {
        id: "2",
        username: "travel_vibes",
        profilePicture:
          "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face",
      },
      image:
        "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=600&fit=crop",
      isViewed: false,
    },
    {
      id: "2",
      user: {
        id: "3",
        username: "food_lover",
        profilePicture:
          "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
      },
      image:
        "https://images.unsplash.com/photo-1636542935295-16f301371f65?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTA2fHx1cmx8ZW58MHx8MHx8fDA%3D",
      isViewed: true,
    },
    {
      id: "3",
      user: {
        id: "4",
        username: "nature_shots",
        profilePicture:
          "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face",
      },
      image:
        "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=400&h=600&fit=crop",
      isViewed: false,
    },
    {
      id: "4",
      user: {
        id: "5",
        username: "fitness_guru",
        profilePicture:
          "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=face",
      },
      image:
        "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=600&fit=crop",
      isViewed: false,
    },
  ];

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
            <div key={story.userId} className="flex-shrink-0" onClick={() => handleStoryClick(story.storyResponses)} >
              <StoryItem story={story}  />
            </div>
          ))}
        {openStoryViewer && activeUserStories && (
          <StoryViewer
            stories={activeUserStories}
            onClose={() => setOpenStoryViewer(false)}
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

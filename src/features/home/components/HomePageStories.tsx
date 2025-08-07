import { Plus } from "lucide-react";
import StoryItem from "../components/StoryItem";
import { useCallback, useState } from "react";
import CreateStoryModal from "../../../common/components/CreateStoryModal";
import { IStoryFollowingList, IStoryResponse } from "../types/home.types";
import StoryViewer from "./StoryViewer";
import { IStoriesProps } from "../types/homeProps.types";
import { getBase64ImageUrl } from "../../../utils/getBase64Image";

const HomePageStories: React.FC<IStoriesProps> = ({ stories }) => {
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
          (story) => story.isSeen == false
        );
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
                src={getBase64ImageUrl()}
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

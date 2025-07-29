import { Plus } from "lucide-react";
import { IStoryHighlightsProps } from "../types/props.types";
import { getBase64ImageUrl } from "../../../utils/getBase64Image";
import { useCallback, useEffect, useState } from "react";
import { IHighlightItem, IStoryResponse } from "../../home/types/home.types";
import StoryViewer from "../../home/components/StoryViewer";
import { getUserIdFromToken } from "../../../utils/jwt.utils";
import { useDeleteHighlight } from "../hooks/useDeleteHighlight";

const StoryHighlights: React.FC<IStoryHighlightsProps> = ({ highlights }) => {
  const loggedInUserId = getUserIdFromToken();

  const [openStoryViewer, setOpenStoryViewer] = useState(false);

  const [isOwnProfile, setIsOwnProfile] = useState(false);

  const [activeHighlightStories, setActiveHighlightStories] = useState<
    IStoryResponse[] | null
  >(null);

  const { mutate: deleteHighlight } = useDeleteHighlight();

  useEffect(() => {
    if (highlights && highlights[0].userId === loggedInUserId) {
      setIsOwnProfile(true);
    } else {
      setIsOwnProfile(false);
    }
  }, [isOwnProfile, highlights, loggedInUserId]);

  const handleHighlightClick = useCallback(
    (highlightIndex: number) => {
      if (!highlights || !highlights[highlightIndex]) return;

      const highlight = highlights[highlightIndex];

      const stories = highlight.items.map((item) => item.storyResponse);

      setOpenStoryViewer(true);

      setActiveHighlightStories(stories);
    },
    [highlights]
  );

  const handleDeleteHighlight = useCallback(
    (highlightId: number) => {
      deleteHighlight(highlightId);
    },
    [deleteHighlight]
  );

  return (
    <div className="mt-6 w-[340px] sm:w-[480px] md:w-[680px] flex gap-6 px-1 overflow-x-auto scrollbar-hidden">
      <div className="flex flex-col gap-2 justify-center items-center">
        <button className="flex justify-center items-center rounded-full w-16 h-16 border-2 border-dashed border-gray-300 cursor-pointer">
          <Plus size={36} color="#5e5e5e" absoluteStrokeWidth />
        </button>
        <span className="text-xs text-gray-600 truncate w-16 text-center">
          New
        </span>
      </div>
      {highlights != null &&
        highlights.map((highlight, index) => (
          <div
            key={highlight.highlightId}
            className="relative flex flex-col gap-2 justify-center items-center"
          >
            {isOwnProfile && (
              <button
                className="absolute top-0 right-0 bg-red-500 text-white text-xs rounded-full px-2 py-1 z-10 hover:bg-red-600 cursor-pointer"
                onClick={() => handleDeleteHighlight(highlight.highlightId)}
              >
                ✕
              </button>
            )}
            <button
              className="border-2 border-dashed border-gray-300 rounded-full"
              onClick={() => handleHighlightClick(index)}
            >
              <img
                src={getBase64ImageUrl(
                  highlights[0].items[0].storyResponse.mediaUrlBase64
                )}
                alt="Highlight Stories"
                className="rounded-full w-16 h-16 border-gray-300 cursor-pointer p-1 object-cover"
              />
            </button>
            <span className="text-xs text-gray-600 truncate w-16 text-center">
              {highlight.title}
            </span>
          </div>
        ))}
      {highlights == null && (
        <div className="flex mt-6 text-gray-700">No Story Highlights</div>
      )}
      {openStoryViewer && activeHighlightStories && (
        <StoryViewer
          stories={activeHighlightStories}
          initialIndex={0}
          onClose={() => setOpenStoryViewer(false)}
          fromHighlights={true}
        />
      )}
    </div>
  );
};

export default StoryHighlights;

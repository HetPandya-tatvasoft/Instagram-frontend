import { Pen, Plus } from "lucide-react";
import { IStoryHighlightsProps } from "../types/props.types";
import { getBase64ImageUrl } from "../../../utils/getBase64Image";
import { useCallback, useEffect, useState } from "react";
import {
  IHighlightResponse,
  IStoryResponse,
} from "../../home/types/home.types";
import StoryViewer from "../../home/components/StoryViewer";
import { getUserIdFromToken } from "../../../utils/jwt.utils";
import { useDeleteHighlight } from "../hooks/useDeleteHighlight";
import EditHighlightModal from "./EditHighlightModal";
import {
  IRemoveStoryFromHighlightPayload,
  IUpdateHighlightPayload,
} from "../types/profile.payload.types";
import { useEditHighlightTitle } from "../hooks/useEditHighlightTitle";
import { useRemoveStoryFromHighlights } from "../hooks/useRemoveStoryFromHighlights";

const StoryHighlights: React.FC<IStoryHighlightsProps> = ({ highlights }) => {
  const loggedInUserId = getUserIdFromToken();

  const [openStoryViewer, setOpenStoryViewer] = useState(false);

  const [isOwnProfile, setIsOwnProfile] = useState(false);

  const [activeHighlightStories, setActiveHighlightStories] = useState<
    IStoryResponse[] | null
  >(null);

  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  const [selectedHighlight, setSelectedHighlight] =
    useState<IHighlightResponse | null>(null);

  const { mutate: deleteHighlight } = useDeleteHighlight();

  const { mutate: updateHighlight } = useEditHighlightTitle();

  const { mutate: removeStoryFromHighlight } = useRemoveStoryFromHighlights();

  console.log("This is the main component het : ");
  console.log(highlights);

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

  const handleEditClick = useCallback(
    (highlight: IHighlightResponse) => {
      setSelectedHighlight(highlight);
      console.log(selectedHighlight);
      setIsEditModalOpen(true);
    },
    [selectedHighlight]
  );

  const handleSaveEditedTitle = useCallback(
    (highlighData: IUpdateHighlightPayload) => {
      console.log("The highlight title has been saved");
      console.log(highlighData);
      updateHighlight({
        highlightId: highlighData.highlightId,
        title: highlighData.title,
      });
      setIsEditModalOpen(false);
    },
    [updateHighlight]
  );

  const handleRemoveStoryFromHighlight = useCallback(
    (storyId: number) => {
      const payloadForRemoveStoryFromHighlight: IRemoveStoryFromHighlightPayload =
        {
          highlightId: selectedHighlight?.highlightId ?? 0,
          storyId: storyId,
        };

      console.log(payloadForRemoveStoryFromHighlight);

      removeStoryFromHighlight(payloadForRemoveStoryFromHighlight);
    },
    [selectedHighlight, removeStoryFromHighlight]
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
        highlights.map((highlight, index) => 
          highlight.items.length > 0 &&
          (
          <div
            key={highlight.highlightId}
            className="relative flex flex-col gap-2 justify-center items-center"
            onClick={() => setSelectedHighlight(highlight)}
          >
            {isOwnProfile && (
              <>
                <button
                  className="absolute top-0 left-0 bg-red-500 text-white text-xs rounded-full w-7 h-7 flex items-center justify-center z-10 hover:bg-red-600 cursor-pointer"
                  onClick={() => handleEditClick(highlight)}
                >
                  <Pen size={14} />
                </button>
                <button
                  className="absolute top-0 right-0 bg-red-500 text-white text-xs rounded-full w-7 h-7 flex items-center justify-center z-10 hover:bg-red-600 cursor-pointer"
                  onClick={() => handleDeleteHighlight(highlight.highlightId)}
                >
                  ✕
                </button>
              </>
            )}

            <button
              className="border-2 border-dashed border-gray-300 rounded-full"
              onClick={() => handleHighlightClick(index)}
            >
              <img
                src={getBase64ImageUrl(
                  highlight.items[0].storyResponse.mediaUrlBase64
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
          handleRemoveStoryFromHighlights={handleRemoveStoryFromHighlight}
        />
      )}
      {selectedHighlight && (
        <EditHighlightModal
          isOpen={isEditModalOpen}
          onClose={() => setIsEditModalOpen(false)}
          onSave={handleSaveEditedTitle}
          highlight={selectedHighlight}
        />
      )}
    </div>
  );
};

export default StoryHighlights;

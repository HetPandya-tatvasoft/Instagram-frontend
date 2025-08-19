import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { IStoryResponse } from "../types/home.types";
import { getBase64ImageUrl } from "../../../utils/getBase64Image";
import { useStoryViewed } from "../hooks/useStoryViewed";
import { getUserIdFromToken } from "../../../utils/jwt.utils";
import { IStoryViewCreatePayload } from "../types/payload.types";
import { MoreVertical, Trash } from "lucide-react";
import { useStoryDelete } from "../hooks/useStoryDelete";
import StoryOptionsMenu from "../../../common/components/StoryOptionsMenu";
import AddToHighlightsModal from "../../../common/components/AddToHighlightsModal";
import { IStoryViewerProps } from "../types/homeProps.types";

const StoryViewer = ({
  stories,
  onClose,
  initialIndex,
  fromHighlights = false,
  handleRemoveStoryFromHighlights,
}: IStoryViewerProps) => {
  const loggedInUserId = getUserIdFromToken();

  const [currentIndex, setCurrentIndex] = useState(initialIndex ?? 0);

  const [isPaused, setIsPaused] = useState(false);

  const [progress, setProgress] = useState(0);

  const [isOwnProfile, setIsOwnProfile] = useState(false);

  const [showOptions, setShowOptions] = useState(false);

  const [highlighModalOpen, setHighlightModalOpen] = useState(false);

  const [viewedStoryIds, setViewedStoryIds] = useState<Set<number>>(new Set());

  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  const { mutate: markStoryViewed } = useStoryViewed();

  const { mutate: deleteStory } = useStoryDelete();

  const currentStory = useMemo(
    () => stories[currentIndex],
    [currentIndex, stories]
  );

  useEffect(() => {
    if (currentStory.userId === loggedInUserId) {
      setIsOwnProfile(true);
    } else {
      setIsOwnProfile(false);
    }
  }, [currentStory.userId, loggedInUserId]);

  const markStoryAsViewed = useCallback(
    (storyId: number) => {
      const payloadForMarkingStoryViewed: IStoryViewCreatePayload = {
        viewerId: loggedInUserId,
        storyId: storyId,
      };
      markStoryViewed(payloadForMarkingStoryViewed);
    },
    [loggedInUserId, markStoryViewed]
  );

  useEffect(() => {
    const storyId = currentStory.storyId;

    if (!viewedStoryIds.has(storyId)) {
      markStoryAsViewed(storyId);
      setViewedStoryIds((prev) => new Set(prev).add(storyId));
    }
  }, [currentStory, setViewedStoryIds, markStoryAsViewed, viewedStoryIds]);

  const handleNext = useCallback(() => {
    if (currentIndex < stories.length - 1) {
      setCurrentIndex((prev) => prev + 1);
    } else {
      onClose();
    }
  }, [currentIndex, stories.length, onClose]);

  const handlePrev = useCallback(() => {
    if (currentIndex > 0) {
      setCurrentIndex((prev) => prev - 1);
    }
  }, [currentIndex, setCurrentIndex]);

  // const handleStoryDelete = useCallback(
  //   (storyId: number) => {
  //     console.log(`The story Id is : ${storyId}`)
  //     deleteStory(storyId);
  //   },
  //   [deleteStory]
  // );

  const handleStoryDelete = useCallback(
    (storyId: number) => {
      deleteStory(storyId, {
        onSuccess: () => {
          const updatedStories = stories.filter(
            (story) => story.storyId !== storyId
          );

          if (updatedStories.length === 0) {
            onClose();
            return;
          }

          const newIndex =
            currentIndex >= updatedStories.length
              ? updatedStories.length - 1
              : currentIndex;

          setCurrentIndex(newIndex);
          setViewedStoryIds(new Set());
        },
      });
    },
    [deleteStory, stories, currentIndex, onClose]
  );

  useEffect(() => {
    setProgress(0);
  }, [currentIndex]);

  useEffect(() => {
    if (intervalRef.current) clearInterval(intervalRef.current);

    intervalRef.current = setInterval(() => {
      if (!isPaused) {
        setProgress((prev) => {
          if (prev >= 100) {
            handleNext();
            return 0;
          }
          return prev + 1.67;
        });
      }
    }, 83);

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [isPaused, handleNext]);

  return (
    <div className="fixed inset-0 bg-black bg-opacity-90 flex items-center justify-center z-50">
      <div
        className="relative bg-black text-white p-4 flex flex-col justify-between rounded-lg max-w-md w-full h-[70vh] text-center"
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
      >
        <div>
          {/* Progress Bars */}
          <div className="flex space-x-1 mb-4">
            {stories.map((_, index) => (
              <div
                key={index}
                className="flex-1 h-1 bg-white/30 rounded overflow-hidden"
              >
                <div
                  className="h-full bg-white transition-all duration-75"
                  style={{
                    width:
                      index < currentIndex
                        ? "100%"
                        : index === currentIndex
                        ? `${progress}%`
                        : "0%",
                  }}
                />
              </div>
            ))}
          </div>

          {/* Story Media */}
          <img
            src={getBase64ImageUrl(currentStory.mediaUrlBase64)}
            alt="Story"
            className="max-h-96 mx-auto rounded-lg"
          />
          <p className="mt-2 text-sm">{currentStory.caption}</p>
        </div>

        {/* Controls */}
        <div className="flex justify-between items-center mt-4">
          {/* Navigation Buttons (Prev & Next) */}
          <button
            onClick={handlePrev}
            disabled={currentIndex === 0}
            className="absolute top-1/2 left-4 transform -translate-y-1/2 text-white bg-black bg-opacity-50 px-3 py-1 rounded-full disabled:opacity-30"
          >
            Prev
          </button>

          <button
            onClick={handleNext}
            className="absolute top-1/2 right-4 transform -translate-y-1/2 text-white bg-black bg-opacity-50 px-3 py-1 rounded-full"
          >
            Next
          </button>
          <button
            onClick={() => setShowOptions((prev) => !prev)}
            className="p-2 bg-black/50 rounded-full flex w-full justify-end"
          >
            <MoreVertical size={20} />
          </button>
        </div>

        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-white text-lg"
        >
          ×
        </button>
        <div className="absolute bottom-4 right-4 text-white z-50">
          <StoryOptionsMenu
            isOwnProfile={isOwnProfile}
            onSave={() => console.log("Saved")}
            onAddToHighlights={() => setHighlightModalOpen(true)}
            onDelete={() => handleStoryDelete(currentStory.storyId)}
            fromHighligts={fromHighlights}
            {...(handleRemoveStoryFromHighlights && {
              handleRemoveStoryFromHighlights: () =>
                handleRemoveStoryFromHighlights(currentStory.storyId),
            })}
          />
        </div>
      </div>
      {/* More Options Button */}
      <AddToHighlightsModal
        open={highlighModalOpen}
        onClose={() => setHighlightModalOpen(false)}
        storyId={currentStory.storyId}
      />
    </div>
  );
};

export default StoryViewer;

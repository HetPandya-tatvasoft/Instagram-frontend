import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { IStoryResponse } from "../types/home.types";
import { getBase64ImageUrl } from "../../../utils/getBase64Image";
import { current } from "@reduxjs/toolkit";
import { useStoryViewed } from "../hooks/useStoryViewed";
import { getUserIdFromToken } from "../../../utils/jwt.utils";
import { IStoryViewCreatePayload } from "../types/payload.types";

interface StoryViewerProps {
  stories: IStoryResponse[];
  onClose: () => void;
  initialIndex?: number;
}

const StoryViewer = ({ stories, onClose, initialIndex }: StoryViewerProps) => {

  const loggedInUserId = getUserIdFromToken();

  const [currentIndex, setCurrentIndex] = useState(initialIndex ?? 0);
  
  const [isPaused, setIsPaused] = useState(false);
  
  const [progress, setProgress] = useState(0);

  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  const [viewedStoryIds, setViewedStoryIds] = useState<Set<number>>(new Set());

  const { mutate: markStoryViewed } = useStoryViewed();

  const currentStory = useMemo(
    () => stories[currentIndex],
    [currentIndex, stories]
  );

  const markStoryAsViewed = useCallback((storyId : number) => {
    const payloadForMarkingStoryViewed : IStoryViewCreatePayload = {
      viewerId : loggedInUserId,
      storyId : storyId,
    }
    console.log("Viewing the story as viewed");
  }, [ loggedInUserId ]);

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
        <div className="flex justify-between mt-4">
          <button
            onClick={handlePrev}
            disabled={currentIndex === 0}
            className="text-sm text-white disabled:opacity-30"
          >
            Prev
          </button>
          <button onClick={handleNext} className="text-sm text-white">
            Next
          </button>
        </div>

        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-white text-lg"
        >
          ×
        </button>
      </div>
    </div>
  );
};

export default StoryViewer;

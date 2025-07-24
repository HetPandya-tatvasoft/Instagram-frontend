import React, { useEffect, useState } from "react";
import { IStoryResponse } from "../types/home.types";
import { getBase64ImageUrl } from "../../../utils/getBase64Image";

interface StoryViewerProps {
  stories: IStoryResponse[];
  onClose: () => void;
}

const StoryViewer = ({ stories, onClose }: StoryViewerProps) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const currentStory = stories[currentIndex];

  useEffect(() => {
    const timer = setTimeout(() => {
      handleNext();
    }, 5000); // 5 seconds per story
    return () => clearTimeout(timer);
  }, [currentIndex]);

  const handleNext = () => {
    if (currentIndex < stories.length - 1) {
      setCurrentIndex(currentIndex + 1);
    } else {
      onClose();
    }
  };

  const handlePrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-90 flex items-center justify-center z-50">
      <div className="relative bg-black text-white p-4 rounded-lg max-w-md w-full text-center">
        {/* Progress Bars */}
        <div className="flex space-x-1 mb-4">
          {stories.map((_, index) => (
            <div
              key={index}
              className="flex-1 h-1 bg-white/30 rounded overflow-hidden"
            >
              <div
                className="h-full bg-white"
                style={{
                  width: index < currentIndex ? "100%" : index === currentIndex ? "100%" : "0%",
                  animation:
                    index === currentIndex
                      ? "fillProgress 5s linear forwards"
                      : "none",
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

        {/* Controls */}
        <div className="flex justify-between mt-4">
          <button
            onClick={handlePrev}
            disabled={currentIndex === 0}
            className="text-sm text-white disabled:opacity-30"
          >
            Prev
          </button>
          <button
            onClick={handleNext}
            className="text-sm text-white"
          >
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

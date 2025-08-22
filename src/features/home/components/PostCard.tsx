import {
  MoreHorizontal,
  Heart,
  MessageCircle,
  Send,
  Bookmark,
} from "lucide-react";
import React, { useState, useCallback, useMemo, useEffect } from "react";
import { usePostLike } from "../hooks/usePostLike";
import { getUserIdFromToken } from "../../../utils/jwt.utils";
import CommentModal from "../../posts/components/CommentModal";
import SavePostModal from "./SavePostModal";
import { motion, AnimatePresence } from "framer-motion";
import { getBase64ImageUrl } from "../../../utils/getBase64Image";
import { IPostCardProps } from "../types/homeProps.types";
import { PostSettingsModal } from "../../posts/components/PostSettingsModal";
import { routes } from "../../../common/constants/routes";
import { useNavigate } from "react-router-dom";
// import { PostSettingsModal } from "../../posts/components/postSettingsModal";

const PostCard: React.FC<IPostCardProps> = React.memo(({ post }) => {
  const [showLikesModal, setShowLikesModal] = useState(false);

  const [showSaveModal, setShowSaveModal] = useState(false);

  const [showPostSettingsModal, setShowPostSettingsModal] = useState(false);

  const [postId, setPostId] = useState<number>(0);

  const [collections, setCollections] = useState(["Favorites", "Inspo"]);

  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const [openCommentModal, setOpenCommentModal] = useState(false);

  const [showAllComments, setShowAllComments] = useState(false);

  const [isZoomed, setIsZoomed] = useState(false);

  const [fade, setFade] = useState(true);

  const navigate = useNavigate();

  const { likePost } = usePostLike();

  const mediaList = useMemo(() => post.mediaUrls || [], [post.mediaUrls]);

  const decodedToken = useMemo(() => getUserIdFromToken(), []);

  const hasLiked = useMemo(
    () =>
      post.like?.some((like) => like.likedByUserId === decodedToken) ?? false,
    [post.like, decodedToken]
  );

  const currentMedia = useMemo(
    () => mediaList[currentImageIndex],
    [mediaList, currentImageIndex]
  );

  const postImageSrc = useMemo(
    () =>
      currentMedia?.mediaUrlBase64?.base64String &&
      getBase64ImageUrl(currentMedia.mediaUrlBase64),
    [currentMedia]
  );

  let imgSrc = "/src/assets/images/default_profile.webp";

  if (
    post.postedByUserProfilePictureBase64 &&
    post.postedByUserProfilePictureBase64.base64String &&
    post.postedByUserProfilePictureBase64.mimeType
  ) {
    const mimeType =
      post.postedByUserProfilePictureBase64.mimeType ===
      "application/octet-stream"
        ? "image/jpeg"
        : post.postedByUserProfilePictureBase64.mimeType;

    imgSrc = `data:${mimeType};base64,${post.postedByUserProfilePictureBase64.base64String}`;
  }

  useEffect(() => {
    setFade(false);
    const timeout = setTimeout(() => setFade(true), 50);
    return () => clearTimeout(timeout);
  }, [postImageSrc]);

  const handlePrev = useCallback(() => {
    setCurrentImageIndex((prev) =>
      prev === 0 ? mediaList.length - 1 : prev - 1
    );
  }, [mediaList.length]);

  const handleNext = useCallback(() => {
    setCurrentImageIndex((prev) =>
      prev === mediaList.length - 1 ? 0 : prev + 1
    );
  }, [mediaList.length]);

  const handleLikeClick = useCallback(
    (postId: number) => {
      likePost(postId);
    },
    [likePost]
  );

  const handleCommentBtnClick = useCallback(() => {
    setOpenCommentModal((prev) => !prev);
  }, [setOpenCommentModal]);

  const handlePostImageClick = useCallback(() => {
    setIsZoomed((prev) => !prev);
  }, [setIsZoomed]);

  const handleSavePostClick = useCallback((postId: number) => {
    setPostId(postId);
    setShowSaveModal(true);
  }, []);

  const handleUserProfileNavigation = useCallback(
    (userId: number) => {
      const route = routes.mainRoutes.userProfile.replace(
        ":userId",
        userId.toString()
      );

      navigate(route);
    },
    [navigate]
  );

  return (
    <div className="bg-white border border-gray-200 rounded-lg mb-4">
      {/* Post Header */}
      <div className="flex items-center justify-between p-4">
        <div className="flex items-center space-x-3">
          <div
            className="cursor-pointer"
            onClick={() => handleUserProfileNavigation(post.postedByUserId)}
          >
            <img
              src={imgSrc}
              alt={` ${post.postedByUserName}'s profile picture.`}
              className={`w-8 h-8 rounded-full object-cover `}
              onClick={() => handlePostImageClick()}
            />
          </div>
          <div>
            <div className="flex">
              <div className="flex items-center space-x-1">
                <span
                  className="font-medium text-sm cursor-pointer mr-3"
                  onClick={() =>
                    handleUserProfileNavigation(post.postedByUserId)
                  }
                >
                  {post.postedByUserName}
                </span>
                <div className="w-4 h-4 bg-blue-500 flex items-center justify-center rounded-full mr-2">
                  <span className="text-white text-xs">✓</span>
                </div>
              </div>
              <span className="text-gray-500 text-sm">• 2h</span>
            </div>
            <div >
              <span className="text-gray-500 text-sm flex">
                {post.location}
              </span>
            </div>
          </div>
        </div>
        <button className="p-2 hover:bg-gray-100 rounded-full">
          <MoreHorizontal size={16} />
        </button>
      </div>

      {/* Post Image */}
      <div className="relative flex w-full justify-center ">
        <AnimatePresence mode="wait">
          <motion.img
            key={postImageSrc}
            src={postImageSrc}
            alt="post"
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.02 }}
            transition={{
              duration: 0.15,
              ease: [0.43, 0.13, 0.23, 0.96],
            }}
            className="w-[500px] h-[360px] object-cover rounded-md"
          />
        </AnimatePresence>

        {mediaList.length > 1 && (
          <>
            <div className="flex justify-center mt-2 space-x-2 absolute bottom-3">
              {mediaList.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setCurrentImageIndex(idx)}
                  className={`w-3 h-2 rounded-full ${
                    idx === currentImageIndex ? "bg-blue-500" : "bg-gray-300"
                  }`}
                />
              ))}
            </div>
            <>
              {currentImageIndex > 0 && (
                <button
                  onClick={handlePrev}
                  className="absolute top-1/2 left-2 bg-black bg-opacity-50 text-white px-2 py-1 rounded-full"
                >
                  ‹
                </button>
              )}
              {currentImageIndex < mediaList.length - 1 && (
                <button
                  onClick={handleNext}
                  className="absolute top-1/2 right-2 bg-black bg-opacity-50 text-white px-2 py-1 rounded-full"
                >
                  ›
                </button>
              )}
            </>
          </>
        )}
      </div>

      {/* Post Actions */}
      <div className="px-4 pt-4 pb-4">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center space-x-4">
            <button
              type="button"
              onClick={() => handleLikeClick(post.postId)}
              className={`p-1 hover:bg-gray-100 rounded-full space-x-1 ${
                hasLiked ? "text-red-500" : "text-black"
              }`}
            >
              <Heart
                size={24}
                fill={hasLiked ? "currentColor" : "none"}
                stroke={hasLiked ? "currentColor" : "black"}
              />
            </button>

            <button
              type="button"
              onClick={() => handleCommentBtnClick()}
              className="p-1 hover:bg-gray-100 rounded-full"
            >
              <MessageCircle size={24} />
            </button>
            <button className="p-1 hover:bg-gray-100 rounded-full">
              <Send size={24} />
            </button>
          </div>
          <button
            type="button"
            onClick={() => handleSavePostClick(post.postId)}
            className="p-1 hover:bg-gray-100 rounded-fill"
          >
            <Bookmark size={24} />
          </button>
        </div>

        {/* Likes Section */}
        <div>
          <span
            className="font-medium text-sm"
            onClick={() => setShowLikesModal(true)}
          >
            {post.like?.length ?? 0} likes
          </span>
        </div>

        {/* Caption */}
        <div>
          <span className="font-medium text-sm mr-2">
            {post.postedByUserName}
          </span>
          <span className="text-sm">{post.caption} </span>
        </div>

        {/* Comments */}
        {post.comments.length > 0 && (
          <div className="space-y-1 mb-2">
            {!showAllComments && post.comments.length > 2 && (
              <button
                onClick={() => setOpenCommentModal(true)}
                className="text-gray-500 text-sm hover:text-gray-700"
              >
                View all {post.comments.length} comments
              </button>
            )}

            {(showAllComments ? post.comments : post.comments.slice(0, 2)).map(
              (comment) => (
                <div key={comment.commentId}>
                  {/* Render your comment here */}
                  <span className="text-sm">
                    <strong
                      className="cursor-pointer"
                      onClick={() =>
                        handleUserProfileNavigation(comment.commentedByUserId)
                      }
                    >
                      {comment.commentedByUserUsername}
                    </strong>{" "}
                    {comment.content}
                  </span>
                </div>
              )
            )}
          </div>
        )}
      </div>
      <CommentModal
        isOpen={openCommentModal}
        onClose={() => setOpenCommentModal(false)}
        post={post}
      />

      {/* This below post settings modal is not useful as of now */}
      {showPostSettingsModal && (
        <PostSettingsModal
          onClose={() => setShowPostSettingsModal(false)}
          postId={post.postId}
        />
      )}
      {showSaveModal && (
        <SavePostModal
          onClose={() => setShowSaveModal(false)}
          postId={postId}
        />
      )}
    </div>
  );
});

export default PostCard;

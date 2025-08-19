import type { IPostComment } from "../../home/types/home.types";
import { getBase64ImageUrl } from "../../../utils/getBase64Image";
import { Heart } from "lucide-react";
import { useCommentLike } from "../../home/hooks/useCommentLike";
import { useCallback, useState, useEffect } from "react";
import { ICommentCompProps } from "../types/postProps.types";

const CommentComponent: React.FC<ICommentCompProps> = (commentProps) => {
  const comment = commentProps.comment;

  const { likeComment } = useCommentLike();

  const [commentLiked, setCommentLiked] = useState(false);

  useEffect(() => {
    setCommentLiked(comment.isCommentLikedByCurrentUser);
  }, [setCommentLiked, comment.isCommentLikedByCurrentUser]);

  const handleLikeComment = useCallback(
    (commentId: number) => {
      likeComment({commentId});
      setCommentLiked(!comment.isCommentLikedByCurrentUser);
    },
    [likeComment, setCommentLiked, comment.isCommentLikedByCurrentUser]
  );

  return (
    <div key={comment.commentId} className="flex gap-3 items-start w-full">
      <div className="flex items-center justify-between w-full">
        <div className="flex items-center space-x-2">
          <div>
            <img
              src={getBase64ImageUrl(
                comment.commentedByUserProfilePictureBase64
              )}
              alt="User"
              className="w-8 h-8 rounded-full"
            />
          </div>
          <div>
            <span className="font-medium mr-2">
              {comment.commentedByUserUsername}
            </span>
            <span>{comment.content}</span>
            <div className="text-xs text-gray-400 mt-1">
              {comment.createdDate.toString()}
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => handleLikeComment(comment.commentId)}
            className={`hover:bg-gray-100 rounded-full space-x-1 ${
              commentLiked ? "text-red-500" : "text-black"
            }`}
          >
            <Heart
              size={24}
              fill={commentLiked ? "currentColor" : "none"}
              stroke={commentLiked ? "currentColor" : "black"}
            />
          </button>
          <span className="text-gray-700">{comment.totalCommentLikes}</span>
        </div>
      </div>
    </div>
  );
};

export default CommentComponent;

import { useEffect } from "react";
import type { PostResponse } from "../../home/types/home.types";
import { getBase64ImageUrl } from "../../../utils/getBase64Image";
import CenterModalLayout from "../../../layouts/CenterModalLayout";
import AddCommentInput from "../components/AddCommentInput";

interface CommentModalProps {
  isOpen: boolean;
  onClose: () => void;
  post: PostResponse;
}

const CommentModal: React.FC<CommentModalProps> = ({
  isOpen,
  onClose,
  post,
}) => {
  console.log(post);
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    }
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    // <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm">
    <CenterModalLayout isOpen={isOpen} onClose={() => console.log("closing")}>
      <div className="bg-white rounded-xl h-[90vh] shadow-lg flex flex-col md:flex-row ">
        {/* Close Button */}

        {/* Right - Comments Section */}
        <div className="flex flex-col w-full">
          <div className="flex justify-between border-b">
            {/* Header */}
            <div className="flex items-center gap-3 p-4 ">
              <div className="flex items-center gap-3">
                <img
                  src={getBase64ImageUrl(post.postedByUserProfilePictureBase64)}
                  alt="Profile"
                  className="w-10 h-10 rounded-full"
                />
                <span className="font-semibold">{post.postedByUserName}</span>
              </div>
              <div>
                <span className="font-semibold"> : </span>
              </div>
              <div>{post.caption}</div>
            </div>
            <button
              onClick={onClose}
              className="text-3xl font-bold text-gray-700 hover:text-gray-500 flex justify-end"
            >
              &times;
            </button>
          </div>

          {/* Comments */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {post.comments.map((comment) => (
              <div key={comment.commentId} className="flex gap-3 items-start">
                <img
                  src={getBase64ImageUrl(post.postedByUserProfilePictureBase64)}
                  alt="User"
                  className="w-8 h-8 rounded-full"
                />
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
            ))}
          </div>

          {/* Input  */}
          <AddCommentInput />
        </div>
      </div>
    </CenterModalLayout>
    // </div>
  );
};

export default CommentModal;

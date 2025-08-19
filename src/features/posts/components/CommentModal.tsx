import { useEffect } from "react";
import type { IPostResponse } from "../../home/types/home.types";
import { getBase64ImageUrl } from "../../../utils/getBase64Image";
import CenterModalLayout from "../../../layouts/CenterModalLayout";
import AddCommentInput from "../components/AddCommentInput";
import CommentComponent from "../components/CommentComponent";
import { ICommentModalProps } from "../types/postProps.types";

const CommentModal: React.FC<ICommentModalProps> = ({
  isOpen,
  onClose,
  post,
}) => {
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
              <CommentComponent key={comment.commentId} comment={comment} />
            ))}
          </div>

          {/* Input  */}
          <AddCommentInput postId={post.postId} />
        </div>
      </div>
    </CenterModalLayout>
    // </div>
  );
};

export default CommentModal;

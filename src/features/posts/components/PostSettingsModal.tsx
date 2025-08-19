import { X } from "lucide-react";
import { PostSettingsModalProps } from "../types/postProps.types";

export const PostSettingsModal: React.FC<PostSettingsModalProps> = ({
  onClose,
  postId,
}) => {
  return (
    <div
      className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-black/40"
      onClick={onClose}
    >
      <div
        className=" bg-white w-full sm:w-[400px] rounded-t-2xl sm:rounded-xl p-4 max-h-[60%] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        
        <h4>
          This is the post settings modal brother and this will act like a
          modal.
        </h4>
      </div>
    </div>
  );
};

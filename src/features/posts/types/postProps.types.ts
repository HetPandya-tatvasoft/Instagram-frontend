import { IPostComment, IPostResponse } from "../../home/types/home.types";
import { ILikeUser } from "./comment.types";

export interface ICommentCompProps {
  comment: IPostComment;
}

export interface ICommentModalProps {
  isOpen: boolean;
  onClose: () => void;
  post: IPostResponse;
}

export interface ILikesModalProps {
  isOpen: boolean;
  onClose: () => void;
  users: ILikeUser[];
  onToggleFollow: (userId: number, isCurrentlyFollowing: boolean) => void;
}

export interface IConnectionBtnProps {
  userId: number;
  followStatus: string;
}

export interface PostSettingsModalProps {
  postId: number;
  onClose: () => void;
}

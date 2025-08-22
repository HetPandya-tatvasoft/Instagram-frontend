import {
  IPostResponse,
  IStoryFollowingList,
  IStoryResponse,
} from "./home.types";

export interface IPostCardProps {
  post: IPostResponse;
}

export interface ICreatePostModalProps {
  isOpen: boolean;
  onClose: () => void;
  handlePost: () => void;
}

export interface IStoryItemProps {
  story: IStoryFollowingList;
}

export interface IStoryViewerProps {
  stories: IStoryResponse[];
  onClose: () => void;
  initialIndex?: number;
  fromHighlights?: boolean;
  handleRemoveStoryFromHighlights?: (storyId: number) => void;
}

export interface IStoriesProps {
  stories: IStoryFollowingList[];
}

export interface ISavePostModalProps {
  onClose: () => void;
  postId: number;
}

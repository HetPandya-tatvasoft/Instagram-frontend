import { IStoryFollowingList } from "./home.types";

export interface ICreatePostModalProps {
  isOpen: boolean;
  onClose: () => void;
  handlePost: () => void;
}

export interface IStoriesProps {
  stories: IStoryFollowingList[];
}

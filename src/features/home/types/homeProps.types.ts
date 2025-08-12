import { IStoryFollowingList } from "./home.types";

export interface ICreatePostModalProps {
  isOpen: boolean;
  onClose: () => void;
  handlePost: () => void;
}

export interface IStoriesProps {
  stories: IStoryFollowingList[];
}

export interface ISavePostModalProps {
  onClose: () => void;
  collections: string[];
  onSaveToCollection: (collectionName: string) => void;
  onCreateCollection: (newCollection: string) => void;
}
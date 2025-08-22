import { NotificationType } from "../../../common/enums/notificationType.enum";
import {
  IHighlightResponse,
  IPostResponse,
  IStoryResponse,
  IUserProfileHeader,
} from "../../home/types/home.types";
import { IUpdateHighlightPayload } from "./profile.payload.types";
import { IUserBio, IUserMedia } from "./profile.types";

export interface IStoryHighlightsProps {
  highlights?: IHighlightResponse[];
}

export interface IEditHighlightModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (highlighData: IUpdateHighlightPayload) => void;
  highlight: IHighlightResponse;
}

export interface INotificationToggleProps {
  icon: React.ElementType;
  title: string;
  description: string;
  type: NotificationType;
  enabled: boolean;
  handleToggle: (type: NotificationType) => void;
}

export interface IProfileBioProps {
  profileBio: IUserBio;
}

export interface IProfileHeaderProps {
  userInfo: IUserProfileHeader;
  userStories: IStoryResponse[];
}

export interface IProfilePictureProps {
  ProfilePictureUrlBase64?: string;
  ProfilePictureBase64MimeType: string;
  userStories: IStoryResponse[];
}

export interface IProfilePostCardProps {
  post: IPostResponse;
  handleLikeClick: (postId: number) => void;
  handlePostDetailsNavigation: (postId: number) => void;
}

export interface IProfilePostsProps {
  posts: IUserMedia;
}

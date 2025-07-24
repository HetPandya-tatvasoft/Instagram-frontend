import { IFileResponse } from "../../../common/types/fileResponseType.type";

export interface IUser {
  id: string;
  username: string;
  profilePicture: string;
  isVerified?: boolean;
}

export interface IComment {
  id: string;
  user: IUser;
  text: string;
  timestamp: string;
}

export interface IPost {
  id: string;
  user: IUser;
  image: string;
  caption: string;
  likes: number;
  comments: IComment[];
  timestamp: string;
  isLiked: boolean;
  isSaved: boolean;
}

// export interface IFileResponse {
//   base64String?: string;
//   mimeType?: string;
// }

export interface IPostMedia {
  mediaId: number;
  mediaUrl: string;
  mediaUrlBase64: IFileResponse;
}

export interface IPostLike {
  likeId: number;
  likedByUserId: number;
  likedByUserProfilePictureBase64: IFileResponse;
  likedByUserUsername?: string;
}

export interface IPostComment {
  commentId: number;
  commentedByUserId: number;
  content: string;
  commentedByUserProfilePictureBase64: IFileResponse;
  commentedByUserUsername?: string;
  totalCommentLikes : number,
  isCommentLikedByCurrentUser : boolean,
  createdDate: string;
}

export interface IPostResponse {
  postId: number;
  postedByUserId: number;
  postedByUserName: string;
  postedByUserProfilePictureBase64: IFileResponse;
  caption?: string;
  location?: string;
  isVisibleToClosedOnes?: boolean;
  musicUrl?: string;
  postType: number;
  isFollowingUserPost?: boolean;
  postUploadDate: string;
  isPostSaved: boolean;
  savedInCollectionIds?: number[] | null;
  mediaUrls: IPostMedia[];
  like: IPostLike[] | null;
  comments: IPostComment[];
}

export interface IUserResponse {
  userId: number;
  userName: string;
  email: string;
  fullName: string;
  dob: string;
  contactNo: string;
  gender: string;
  profilePicture: string;
  profilePictureBase64: IFileResponse;
  avatarUrl: string;
  link: string;
  bio: string;
  isActive: boolean;
  isPrivate: boolean;
  isVerified: boolean;
  followStatus: string;
}

export interface IUserConnectionData {
  followersCount: number;
  followingCount: number;
  followStatus : string;
}

export interface IUserProfileHeader {
  userHeaderInfo? : IUserResponse;
  userConnectionData : IUserConnectionData
}

export interface IAddCommentInputProps {
  postId : number;
}

export interface IStoryView {
  viewId : number;
  storyId : number;
  viewerId : number;
  isLiked : boolean;
  viewerUserName : string;
  viewerFullName : string;
  viewedAt : string;
}

export interface IStoryResponse { 
  storyId : number;
  userId : number;
  userName : string;
  userProfilePictureBase64? : IFileResponse;
  mediaUrl : string;
  mediaUrlBase64? : IFileResponse;
  musicUrl? : string;
  caption : string;
  isVisibleToClosedOnes : boolean;
  isHighlighted : boolean;
  storyViews? : IStoryView;
  isLikedByViewer : boolean;
  storyUploadTime : string;
  isSeen : boolean;
}

export interface IStoryFollowingList {
  userId : number;
  userName : string;
  isAnyUnseenStory : boolean;
  storyResponses : IStoryResponse[]
}
export interface User {
  id: string;
  username: string;
  profilePicture: string;
  isVerified?: boolean;
}

export interface Comment {
  id: string;
  user: User;
  text: string;
  timestamp: string;
}

export interface Post {
  id: string;
  user: User;
  image: string;
  caption: string;
  likes: number;
  comments: Comment[];
  timestamp: string;
  isLiked: boolean;
  isSaved: boolean;
}

export interface FileResponse {
  base64String?: string;
  mimeType?: string;
}

export interface PostMedia {
  mediaId: number;
  mediaUrl: string;
  mediaUrlBase64: FileResponse;
}

export interface PostLike {
  likeId: number;
  likedByUserId: number;
  likedByUserProfilePictureBase64: FileResponse;
  likedByUserUsername?: string;
}

export interface PostComment {
  commentId: number;
  commentedByUserId: number;
  content: string;
  commentedByUserProfilePictureBase64: FileResponse;
  commentedByUserUsername?: string;
  totalCommentLikes : number,
  isCommentLikedByCurrentUser : boolean,
  createdDate: string;
}

export interface PostResponse {
  postId: number;
  postedByUserId: number;
  postedByUserName: string;
  postedByUserProfilePictureBase64: FileResponse;
  caption?: string;
  location?: string;
  isVisibleToClosedOnes?: boolean;
  musicUrl?: string;
  postType: number;
  isFollowingUserPost?: boolean;
  postUploadDate: string;
  isPostSaved: boolean;
  savedInCollectionIds?: number[] | null;
  mediaUrls: PostMedia[];
  like: PostLike[] | null;
  comments: PostComment[];
}

export interface UserResponse {
  userId: number;
  userName: string;
  email: string;
  fullName: string;
  dob: string;
  contactNo: string;
  gender: string;
  profilePicture: string;
  profilePictureBase64: FileResponse;
  avatarUrl: string;
  link: string;
  bio: string;
  isActive: boolean;
  isPrivate: boolean;
  isVerified: boolean;
  followStatus: string;
}

export interface UserConnectionData {
  followersCount: number;
  followingCount: number;
  followStatus : string;
}

export interface UserProfileHeader {
  userHeaderInfo? : UserResponse;
  userConnectionData : UserConnectionData
}

export interface addCommentInputProps {
  postId : number;
}
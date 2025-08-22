import { IFileResponse } from "../../../common/types/fileResponseType.type";

export interface IAddCommentPayload {
  commentContent: string;
}

export interface ILikeUser {
  userId: number;
  username: string;
  profilePicBase64: IFileResponse;
  isFollowing: boolean;
}

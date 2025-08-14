import { NumberSchema } from "yup";
import type { IPaginationRequestGeneric } from "../../../common/types/paginationRequest.type";

export interface IAddCommentPayload {
  commentId: number;
  postId: number;
  commentedByUserId: number;
  content: string;
}

export interface IPostRequestPayload {
  userId: number;
}

export interface ICreateStoryPayload {
  postedByUserId: number;
  story: File;
  musicUrl: string;
  caption: string;
  isVisibleToClosedOnes: boolean;
}

export interface IStoryViewCreatePayload {
  storyId: number;
  viewerId?: number;
  isLiked?: boolean;
}

export interface ICollectionCreatePayload {
  userId: number;
  title: string;
  postId: number;
}

export interface ICollectionUpsertPayload {
  collectionId: number;
  userId?: number;
  postId: number;
}
import { genderEnum } from "../../../common/enums/gender.enum";
import type { IPostResponse } from "../../home/types/home.types";

export interface IUpdateUserProfilePayload {
  email: string;
  fullName: string;
  username: string;
  contactNumber: string;
  dateOfBirth: string;
  bio: string;
  isPrivate?: boolean;
  gender: genderEnum;
  link?: string;
}

export interface IFileResponseDTO {
  fileName: string;
  fileType: string;
  base64: string;
}

export interface IUserProfileResponse {
  userId: number;
  userName: string;
  email: string;
  fullName : string;
  dob: string; 
  contactNo: string;
  gender: string;
  profilePicture?: string;
  profilePictureBase64?: IFileResponseDTO;
  avatarUrl?: string;
  link?: string;
  bio: string;
  isPrivate: boolean;
  isVerified : boolean;
  followStatus : string;
}

export interface IUserMedia {
  userPosts? : IPostResponse[],
}

export interface IUserBio {
  name : string;
  profileBio? : string;
}

export interface IHighlightError {
  reference?: string;
  parameter?: string;
  errorCode?: string;
  message: string;
}

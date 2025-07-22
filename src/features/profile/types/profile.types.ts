import { genderEnum } from "../../../common/enums/gender.enum";
import type { PostResponse } from "../../home/types/home.types";

export interface UpdateUserProfilePayload {
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

export interface FileResponseDTO {
  fileName: string;
  fileType: string;
  base64: string;
}

export interface UserProfileResponse {
  userId: number;
  userName: string;
  email: string;
  fullName : string;
  dob: string; 
  contactNo: string;
  gender: string;
  profilePicture?: string;
  profilePictureBase64?: FileResponseDTO;
  avatarUrl?: string;
  link?: string;
  bio: string;
  isPrivate: boolean;
  isVerified : boolean;
  followStatus : string;
}


export interface UserMedia {
  userPosts? : PostResponse,
}
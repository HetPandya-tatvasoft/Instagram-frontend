export interface UpdateUserProfilePayload {
    email? : string,
    fullName? : string,
    username? : string,
    contactNumber? : string,
    dateOfBirth? : string,
    bio? : string,
    isProfilePrivate? : boolean,
    gender? : 'male' | 'female' | 'custom' | 'prefer not to say',
    link? : string
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
    fullName?: string;
    dob?: string; // Use string for ISO format date (e.g. "2024-05-12T00:00:00")
    contactNo?: string;
    gender?: string;
    profilePicture?: string;
    profilePictureBase64?: FileResponseDTO;
    avatarUrl?: string;
    link?: string;
    bio?: string;
    isActive?: boolean;
    isPrivate?: boolean;
    isVerified?: boolean;
    followStatus?: string;
  }
  
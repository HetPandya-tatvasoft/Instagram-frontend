export interface ILoginPayload {
  credential: string;
  password: string;
}

export interface IRegisterUserPayload {
  email: string;
  password: string;
  fullName: string;
  username: string;
  contactNumber: string;
  dateOfBirth: Date | string;
}

export interface IForgotPasswordPayload {
  credential: string;
}

export interface IResetPasswordPayload {
  token: string;
  password: string;
  confirmPassword: string;
}

export interface IStringResponseGeneral {
  result: string;
}

export interface ISendResetLinkResponse {
  result: string;
}

export interface ILoginResponse {
  isSuccess: boolean;
  statusCode: number;
  message: string;
  data: {
    token: string;
  };
  errorCode: string | null;
}

// This RegisterUserResponse needs to be extended / updated
export interface IRegisterUserResponse {
  email: string;
  password: string;
  fullName: string;
  username: string;
  contactNumber: string;
  dateOfBirth: string;
}

export interface IUser {
  token: string;
  username: string;
  email: string;
  contactNumber: string;
  fullName: string;
  dateOfBirth: string;
  gender?: string;
  profilePicture?: string;
  avatarUrl?: string;
}

export interface IDecodedToken {
  UserId: number;
  Username: string;
  "http://schemas.xmlsoap.org/ws/2005/05/identity/claims/emailaddress": string;
  ContactNumber: string;
  FullName: string;
  DateOfBirth: string;
  Gender: string;
  ProfilePicture: string;
  AvatarUrl: string;
  exp: number;

  [key: string]: string | number;
}

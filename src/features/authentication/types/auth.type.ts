export interface LoginPayload {
    credential: string;
    password: string;
}

export interface RegisterUserPayload {
    email: string,
    password: string,
    fullName: string,
    username: string,
    contactNumber: string
    dateOfBirth: Date | null,
}


export interface LoginResponse {
    isSuccess: boolean;
    statusCode: number;
    message: string;
    data: {
        token: string;
    };
    errorCode: string | null;
}

// This RegisterUserResponse needs to be extended / updated
export interface RegisterUserResponse {
    email: string,
    password: string,
    fullName: string,
    username: string,
    contactNumber: string
    dateOfBirth: string,
}


export interface User {
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


export interface DecodedToken {
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
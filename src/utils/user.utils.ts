// This does the thing of extracting decoded token details and mapping it to the User type Object

import { claims } from "../common/constants/keys";
import type { DecodedToken, User } from "../features/authentication/types/auth.type";


export const buildUserFromToken = (
    token: string,
    decoded: DecodedToken
): User => ({
    token,
    username: decoded.Username,
    email: decoded[claims.email] as string,
    contactNumber: decoded.ContactNumber,
    fullName: decoded.FullName,
    dateOfBirth: decoded.DateOfBirth,
    gender: decoded.Gender,
    profilePicture: decoded.ProfilePicture,
    avatarUrl: decoded.AvatarUrl,
})

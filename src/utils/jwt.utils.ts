import { jwtDecode } from "jwt-decode";
import type { DecodedToken } from "../features/authentication/types/auth.type";
import { MESSAGES } from "../common/constants/messages";
import toast from "react-hot-toast";
import { getAuthToken } from "./cookie.utils";


export const decodeToken = (token : string ) : DecodedToken | null => {
    try{
        return jwtDecode<DecodedToken>(token);
    }catch {
        toast.error(MESSAGES.AUTH.INVALID_TOKEN);
        return null
    }
}

export const getUserIdFromToken = () => {
    const token = getAuthToken();
    const decodedTokenData = decodeToken(token ?? "");
    const userId = Number(decodedTokenData?.UserId)

    return userId;
}
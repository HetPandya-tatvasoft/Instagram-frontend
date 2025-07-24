import { jwtDecode } from "jwt-decode";
import type { IDecodedToken } from "../features/authentication/types/auth.type";
import { messages } from "../common/constants/messages";
import toast from "react-hot-toast";
import { getAuthToken } from "./cookie.utils";


export const decodeToken = (token : string ) : IDecodedToken | null => {
    try{
        return jwtDecode<IDecodedToken>(token);
    }catch {
        toast.error(messages.auth.invalidToken);
        return null
    }
}

export const getUserIdFromToken = () => {
    const token = getAuthToken();
    const decodedTokenData = decodeToken(token ?? "");
    const userId = Number(decodedTokenData?.UserId)

    return userId;
}
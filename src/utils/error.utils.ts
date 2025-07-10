
import axios, { AxiosError } from "axios";
import toast from "react-hot-toast";
import { MESSAGES } from "../common/constants/messages";

export const handleApiError = (error: unknown) => {
    if (axios.isAxiosError(error)) {
        const backendData = error.response?.data;

        if (backendData?.data && typeof backendData.data === 'string') {
            toast.error(backendData.data);
        } else if (backendData?.message) {
            toast.error(backendData.message);
        } else {
            toast.error(MESSAGES.ERROR.INTERNAL_SERVER_ERROR);
        }
    } else {
        toast.error(MESSAGES.ERROR.INTERNAL_SERVER_ERROR);
    }
}

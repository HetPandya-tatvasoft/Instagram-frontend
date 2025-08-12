import axios, { AxiosError } from "axios";
import toast from "react-hot-toast";
import { messages } from "../common/constants/messages";
import performLogout from "./logout.utils";

export const handleApiError = (error: unknown) => {
  if (axios.isAxiosError(error)) {
    const backendData = error.response?.data;

    if (backendData?.data && typeof backendData.data === "string") {
      toast.error(backendData.data);
    } else if (backendData?.message) {
      toast.error(backendData.message);
    } else {
      toast.error(messages.error.internalServerError);
    }
  } else {
    toast.error(messages.error.internalServerError);
  }
};

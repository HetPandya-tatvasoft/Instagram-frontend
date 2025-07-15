import axios, { AxiosError } from "axios";
import toast from "react-hot-toast";
import { MESSAGES } from "../common/constants/messages";
import useLogout from "../hooks/useLogout";

export const handleApiError = (error: unknown) => {
  if (axios.isAxiosError(error)) {
    const backendData = error.response?.data;
    const responseStatusCode = error.response?.status;

    if (backendData?.data && typeof backendData.data === "string") {
      toast.error(backendData.data);
    } else if (backendData?.message) {
      toast.error(backendData.message);
    } else if (responseStatusCode === 401) {
      console.log(error.response?.status);
      toast.error("You are unauthorized, Please log in again");
    } else {
      toast.error(MESSAGES.ERROR.INTERNAL_SERVER_ERROR);
    }
  } else {
    toast.error(MESSAGES.ERROR.INTERNAL_SERVER_ERROR);
  }
};

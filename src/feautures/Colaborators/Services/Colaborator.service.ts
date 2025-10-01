import axios from "axios";
import axiosInstance from "../../../Core/AxiosConfig";
import type { SendRequestData } from "../Interfaces/send-join-request.interface";

const sendJoinRequest = async (data: SendRequestData) => {
  try {
    const formData = new FormData();
    data.files.forEach((file) => formData.append("files", file));
    Object.entries(data).forEach(([key, value]) => {
      if (key !== "files" && value != null) {
        formData.append(key, value.toString());
      }
    });
     await axiosInstance.post(
      "colaborator/register-request",
      formData
    );
     return

  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      console.error(error.response?.data || error.message);
      throw new Error(error.response?.data.message);
    } else {
      console.error("Error desconocido:", error);
      throw new Error("Error desconocido");
    }
  }
};

export { sendJoinRequest };

import axios from "axios";
import axiosInstance from "../../../Core/AxiosConfig";
import type { MasterRequestData } from "../Interfaces/send-mstert-request.interface";

const sendMasterRequest = async (data: MasterRequestData) => {
  try {
    console.table(data)
    return
    const response = await axiosInstance.post("", data);
    return response.data.message;
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

export {sendMasterRequest}
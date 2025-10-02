import axios from "axios";
import axiosInstance from "../../../Core/AxiosConfig";

const sendShort = async (data:any) => {
  try {
    const formData = new FormData();
    data.files.forEach((file:File) => formData.append("file", file));
    Object.entries(data).forEach(([key, value]) => {
      if (key !== "files" && value != null) {
        formData.append(key, value.toString());
      }
    });
     await axiosInstance.post(
      "shorts",
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
const uploadAudio = async (audioFile: File, userId?: string | number) => {
  try {
    const form = new FormData();
    form.append("file", audioFile);
    if (userId !== undefined && userId !== null) {
      form.append("userId", String(userId));
    }

    const response = await axiosInstance.post("files/upload", form, {
      headers: { "Content-Type": "multipart/form-data" },
    });

    return response.data; 
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      console.error(error.response?.data || error.message);
      throw new Error(error.response?.data?.message || "Upload failed");
    } else {
      console.error("Error desconocido:", error);
      throw new Error("Error desconocido");
    }
  }
};

const createShort = async (data: {
  text: string;
  country: string;
  description: string;
  file: File |null;
  userId?: string;
  createBy?: string;
}) => {
  try {

    const formData = new FormData();
    formData.append("text", data.text);
    formData.append("country", data.country);
    formData.append("description", data.description);
    formData.append("file", data.file as Blob);

    const response = await axiosInstance.post("shorts", data);
    return response.data;
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      console.error(error.response?.data || error.message);
      throw new Error(error.response?.data?.message || "Creation failed");
    } else {
      console.error("Error desconocido:", error);
      throw new Error("Error desconocido");
    }
  }
};


const getShorts = async (params?: Record<string, any>) => {
  try {
    const response = await axiosInstance.get("shorts", { params });
    return response.data;
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      console.error(error.response?.data || error.message);
      throw new Error(error.response?.data?.message || "Fetch failed");
    } else {
      console.error("Error desconocido:", error);
      throw new Error("Error desconocido");
    }
  }
};

const getShortById = async (id: string | number) => {
  try {
    const response = await axiosInstance.get(`shorts/${id}`);
    return response.data;
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      console.error(error.response?.data || error.message);
      throw new Error(error.response?.data?.message || "Fetch failed");
    } else {
      console.error("Error desconocido:", error);
      throw new Error("Error desconocido");
    }
  }
};

export { uploadAudio, createShort, getShorts, getShortById,sendShort };

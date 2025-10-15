import axiosInstance from "@core/AxiosConfig";
import axios from "axios";
import type {
  FavoriteCreated,
  FilterMyShorts,
  FilterShorts,
} from "../Interfaces/file";

const createShort = async (data: any) => {
  try {
    const formData = new FormData();
    data.files.forEach((file: File) => formData.append("file", file));
    Object.entries(data).forEach(([key, value]) => {
      if (key !== "files" && value != null) {
        formData.append(key, value.toString());
      }
    });
    await axiosInstance.post("shorts", formData);
    return;
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

const RemoveShort = async (id: string) => {
  try {
    await axiosInstance.delete(`shorts/${id}`);
    return;
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

const getShorts = async (data: FilterShorts) => {
  try {
    const params: Record<string, any> = {};
    if (data.country) params.country = data.country;
    if (data.page !== undefined) params.page = data.page;
    if (data.limit !== undefined) params.limit = data.limit;
    if (data.approved !== undefined && data.approved !== null)
      params.approved = data.approved;

    const response = await axiosInstance.get("shorts", {
      params,
    });
    return response.data;
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      console.error(error.response?.data || error.message);
      throw new Error(
        error.response?.data?.message || "Failed to fetch audios"
      );
    } else {
      console.error("Error desconocido: ", error);
      throw new Error("Error desconocido");
    }
  }
};

const getMyShorts = async (data: FilterMyShorts) => {
  try {
    const params: Record<string, any> = {};
    if (data.text) params.text = data.text;
    if (data.page !== undefined) params.page = data.page;
    if (data.limit !== undefined) params.limit = data.limit;

    const response = await axiosInstance.get("shorts/my-shorts", {
      params,
    });
    return response.data;
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      console.error(error.response?.data || error.message);
      throw new Error(
        error.response?.data?.message || "Failed to fetch audios"
      );
    } else {
      console.error("Error desconocido: ", error);
      throw new Error("Error desconocido");
    }
  }
};

const addShortsToFavorites = async (
  ids: string[]
): Promise<FavoriteCreated[] | any> => {
  try {
    const { data } = await axiosInstance.post("/shorts/favorites", ids, {
      headers: { "Content-Type": "application/json" },
    });
    return data;
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      console.error(error.response?.data || error.message);
      throw new Error(
        error.response?.data?.message || "Failed to add favorites"
      );
    } else {
      console.error("Unknown error: ", error);
      throw new Error("Unknown error");
    }
  }
};

export {
  createShort,
  getShorts,
  addShortsToFavorites,
  getMyShorts,
  RemoveShort,
};

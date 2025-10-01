import axios from "axios";
import type { ShortFiltersDto } from "../Interfaces/interfaces";
import axiosInstance from "../../../Core/AxiosConfig";

const getShorts = async (data: ShortFiltersDto) => {
  try {
    const params: Record<string, any> = {};

    if (data.country) params.country = data.country;
    if (typeof data.approved !== "undefined") params.approved = data.approved;
    if (data.page) params.page = data.page;
    if (data.limit) params.limit = data.limit;

    const response = await axiosInstance.get("/shorts", { params });

    return response.data;
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

export { getShorts };

import axios from "axios";
import axiosInstance from "../../../Core/AxiosConfig";
import type { getUsers } from "../Interfaces/getUsers.dto";

const GetUsers = async (Data: getUsers) => {
  try {
    const response = await axiosInstance.get("auth/users-registered", {
      params: Data,
    });

    return response.data;
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      console.error(error.response?.data || error.message);
    } else {
      console.error("Error desconocido: ", error);
      throw new Error("Errro desconocido");
    }
  }
};

export { GetUsers };

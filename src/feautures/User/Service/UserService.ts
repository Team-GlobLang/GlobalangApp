import axiosInstance from "@core/AxiosConfig";
import type {
  ChangePasswordData,
  updateUserInfo,
} from "../Interfaces/UserInterfaces";
import axios from "axios";
import { userStore } from "@UserStore";

const updateUser = async (data: updateUserInfo) => {
  try {
    const response = await axiosInstance.patch("/auth/user", data);

    if (response.data.success == true) {
      if (userStore.user) {
        userStore.setUser({
          ...userStore.user,
          ...data,
        });
      }
    }
    return { success: true };
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      console.error(error.response?.data || error.message);
      throw new Error(error.response?.data?.message || "Error desconocido");
    } else {
      console.error("Error desconocido:", error);
      throw new Error("Error desconocido");
    }
  }
};

const changePassword = async (data: ChangePasswordData) => {
  if (data.newPassword !== data.repeatPassword) {
    throw new Error("New passwords do not match");
  }

  try {
    const response = await axiosInstance.patch("/auth/change-password", {
      currentPassword: data.currentPassword,
      newPassword: data.newPassword,
    });

    if (response.data.success !== true) {
      throw new Error(response.data.message || "Unknown error");
    }

    return { success: true };
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      console.error(error.response?.data || error.message);
      throw new Error(error.response?.data?.message || "Unknown error");
    } else {
      console.error("Unknown error:", error);
      throw new Error("Unknown error");
    }
  }
};

export { updateUser, changePassword };

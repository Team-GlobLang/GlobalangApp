import axiosInstance from "@core/AxiosConfig";
import type {
  ChangePasswordData,
  updateUserInfo,
} from "../Interfaces/UserInterfaces";
import axios from "axios";
import { userStore } from "@UserStore";
import paymenInstance from "@core/AxiosPaymentConfig";
import { Capacitor } from "@capacitor/core";
import { Browser } from "@capacitor/browser";

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

const isNative = Capacitor.isNativePlatform();
const openStripeCheckout = async (url: string) => {
  if (isNative) {
    await Browser.open({ url });
  } else {
    window.open(url, "_blank");
  }
};

const generatePaymentLink = async () => {
  try {
    const response = await paymenInstance.post(
      "/payment/create-checkout-session",
      {
        amount: "20"
      }
    );

    if (response.data.url) {
      const url = response.data.url;
      openStripeCheckout(url);
    } else return { success: true };
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

export { updateUser, changePassword, generatePaymentLink };

import axios from "axios";
import { envs } from "../config/env";
import { userStore } from "@UserStore";

const paymenInstance = axios.create({
  baseURL: envs.PaymentUrl,
});


const getUserId = (): string | null => {
  return userStore.user?.id || null;
};

paymenInstance.interceptors.request.use((config) => {
  const userId = getUserId();

  if (userId && config.method?.toLowerCase() === "post") {
    config.data = config.data || {};
    config.data.productId = userId;
    config.data.currency = "usd";
    config.data.quantity = 1;
  }

  return config;
});

export default paymenInstance;

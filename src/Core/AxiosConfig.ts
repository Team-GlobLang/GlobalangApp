import axios from "axios";
import { envs } from "../config/env";
import toast from "vue3-hot-toast";

import router from "../router";

const axiosInstance = axios.create({
  baseURL: envs.APIURL,
});

const getAccessToken = (): string | null => {
  return localStorage.getItem("accessToken");
};

const getRefreshData = () => {
  const refreshToken = localStorage.getItem("refT");
  const deviceUuid = localStorage.getItem("uuid");

  return { refreshToken, deviceUuid };
};

axiosInstance.interceptors.request.use((config) => {
  const token = getAccessToken();
  if (token) {
    config.headers = config.headers || {};
    config.headers["Authorization"] = `Bearer ${token}`;
  }
  return config;
});

axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (error.response?.status !== 401 || originalRequest._retry) {
      return Promise.reject(error);
    }

    const refreshData = getRefreshData();
    if (!refreshData.refreshToken || !refreshData.deviceUuid) {
      router.replace({ name: "Login" });
      toast.error(
        "Session expired. You have been logged out for security reasons. Please log in again."
      );
      return Promise.reject(error);
    }

    originalRequest._retry = true;

    try {
      const { data } = await axiosInstance.post("auth/refresh", null, {
        headers: {
          "refresh-token": refreshData.refreshToken,
          "device-uuid": refreshData.deviceUuid,
        },
      });

      const token = data.token;
      const deviceUuid = data.deviceUuid;
      const refreshToken = data.refresh_token;

      localStorage.setItem("accessToken", token);
      localStorage.setItem("uuid", deviceUuid);
      localStorage.setItem("refT", refreshToken);

      originalRequest.headers["Authorization"] = `Bearer ${token}`;
      return axios(originalRequest);
    } catch (refreshError) {
      toast.error(
        "Session expired. You have been logged out for security reasons. Please log in again."
      );
      router.replace({ name: "Login" });
      return Promise.reject(refreshError);
    }
  }
);

export default axiosInstance;

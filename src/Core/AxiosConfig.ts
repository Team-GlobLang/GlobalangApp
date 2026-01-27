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


const refreshAxios = axios.create({
  baseURL: envs.APIURL,
});


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

    if (originalRequest.url?.includes("auth/refresh")) {
      return Promise.reject(error);
    }

    const refreshData = getRefreshData();
    if (!refreshData.refreshToken || !refreshData.deviceUuid) {
      router.replace({ name: "Login" });
      toast.error("Session expired. Please log in again.");
      return Promise.reject(error);
    }

    originalRequest._retry = true;

    try {
      const { data } = await refreshAxios.post("auth/refresh", null, {
        headers: {
          "refresh-token": refreshData.refreshToken,
          "device-uuid": refreshData.deviceUuid,
        },
      });

      localStorage.setItem("accessToken", data.token);
      localStorage.setItem("uuid", data.deviceUuid);
      localStorage.setItem("refT", data.refresh_token);

      originalRequest.headers.Authorization = `Bearer ${data.token}`;
      return axiosInstance(originalRequest);
    } catch {
      toast.error("Session expired. Please log in again.");
      router.replace({ name: "Login" });
      return Promise.reject(error);
    }
  }
);


export default axiosInstance;

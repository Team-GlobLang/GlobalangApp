import axios from "axios";
import axiosInstance from "../../../Core/AxiosConfig";
import type {
  changePasswordInterface,
  LoginForm,
  RegisterForm,
} from "../Interfaces";
import type { RecoveryCode } from "../Interfaces/RecoveryCodeInterface";

const singIn = async (Data: LoginForm) => {
  try {
    const response = await axiosInstance.post("auth/login", Data);
    const token = response.data.token;
    const deviceUuid = response.data.deviceUuid;
    const refreshToken = response.data.refresh_token;
    if (!token) {
      throw new Error("Login failed: Please try again");
    }

    localStorage.setItem("accessToken", token);
    localStorage.setItem("uuid", deviceUuid);
    localStorage.setItem("refT", refreshToken);

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

const singUp = async (Data: RegisterForm) => {
  try {
    const response = await axiosInstance.post("auth/register", Data);
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

const requestRecoveryCode = async (email: string) => {
  try {
    const response = await axiosInstance.post("auth/forget", { email });
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

const verifyRecoveryCode = async (data: RecoveryCode) => {
  try {
    const response = await axiosInstance.post("auth/code-verify", data);
    const forgetToken = response.data.forgetToken;
    if (!forgetToken) {
      throw new Error("Verification fail.");
    }
    localStorage.setItem("forgetToken", forgetToken);
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

const changePassword = async (data: changePasswordInterface) => {
  try {
    const forgetToken = localStorage.getItem("forgetToken");
    const response = await axiosInstance.patch("auth/reset-password", {
      ...data,
      forgetToken,
    });
    return response.data.message;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error(error.response?.data || error.message);
      throw new Error(error.response?.data.message);
    } else {
      console.error("Error desconocido:", error);
      throw new Error("Error desconocido");
    }
  }
};

const canUserAcces = async (to: string) => {
  try {
    const response = await axiosInstance.post("auth/grant-access-to", { to:to });
    return response.data.allowed;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error(error.response?.data || error.message);
      return false;
    } else {
      console.error("Error desconocido:", error);
      return false;
    }
  }
};

export {
  singIn,
  singUp,
  requestRecoveryCode,
  verifyRecoveryCode,
  changePassword,
  canUserAcces,
};

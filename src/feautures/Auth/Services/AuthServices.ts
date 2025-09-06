import axios from "axios";
import axiosInstance from "../../../Core/AxiosConfig";
import type { LoginForm, RegisterForm } from "../Interfaces";

const singIn = async (Data: LoginForm) => {
  try {
    const response = await axiosInstance.post("auth/login", Data);
    const token = response.data.token;

    if (!token) {
      throw new Error("Login failed: Please try again");
    }
    
    localStorage.setItem("accessToken", token);

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

export { singIn, singUp };

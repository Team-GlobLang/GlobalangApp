import axiosInstance from "@core/AxiosConfig";
import type { QuizPayload, QuizzesFilters } from "../types/quizTypes";
import axios from "axios";

const sendQuiz = async (data: QuizPayload) => {
  try {
    const formData = new FormData();

    formData.append("quiz", JSON.stringify(data.quiz));

    const questionsWithoutFiles = data.questions.map(
      ({ file, ...rest }) => rest
    );
    formData.append("questions", JSON.stringify(questionsWithoutFiles));

    data.questions.forEach((q, index) => {
      if (q.file) {
        formData.append(`questions[${index}].file`, q.file);
      }
    });

    await axiosInstance.post("Full-Quiz", formData);

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

const getQuizzes = async (data: QuizzesFilters) => {
  try {
    const params: Record<string, any> = {};
    if (data.country) params.country = data.country;
    if (typeof data.isApproved !== "undefined")
      params.isApproved = data.isApproved;
    if (data.page) params.page = data.page;
    if (data.limit) params.limit = data.limit;

    const response = await axiosInstance.get("/Full-Quiz", { params });

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

const getMyQuizzes = async (data: QuizzesFilters) => {
  try {
    const params: Record<string, any> = {};

    if (data.search) params.search = data.search;
    if (typeof data.isApproved !== "undefined")
      params.isApproved = data.isApproved;
    if (data.page) params.page = data.page;
    if (data.limit) params.limit = data.limit;

    const response = await axiosInstance.get("/Full-Quiz/MyQuizzes", {
      params,
    });

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
const getQuiz = async (id: string) => {
  try {
    const response = await axiosInstance.get(`/Full-Quiz/${id}`);
    return response.data.data;
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
const getQuizQuestions = async (id: string) => {
  try {
    const response = await axiosInstance.get(`/Full-Quiz/question/${id}`);
    return response.data.data;
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

export { sendQuiz, getQuizzes, getMyQuizzes, getQuiz, getQuizQuestions };

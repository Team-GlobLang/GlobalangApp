
import axiosInstance from "@core/AxiosConfig";
import type { QuizPayload } from "../types/quizTypes";
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

export { sendQuiz };

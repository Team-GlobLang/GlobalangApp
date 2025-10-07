import { useMutation } from "@tanstack/vue-query";
import { h } from "vue";
import toast from "vue3-hot-toast";
import type { ApiError } from "../../../Core/types/ApiError";
import type { QuizPayload } from "../types/quizTypes";
import { sendQuiz } from "../service/QuizService";

export const UseSenQuiz = () => {
  const mutation = useMutation({
    mutationFn: (data: QuizPayload) =>
      toast.promise(sendQuiz(data), {
        loading: "Please wait...",
        success: "Your quiz was submitted successfully. Please wait for the moderators to review it.",
        error: (error: ApiError) => h("span", `${error.message}`),
      }),
  });

  return mutation;
};

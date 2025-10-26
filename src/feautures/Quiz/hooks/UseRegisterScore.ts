import { useMutation } from "@tanstack/vue-query";
import { h } from "vue";
import toast from "vue3-hot-toast";
import type { ApiError } from "../../../Core/types/ApiError";
import type { RegisterScore } from "../types/quizTypes";
import { registerQuizScore } from "../service/QuizService";

export const UseRegisterScore = () => {
  const mutation = useMutation({
    mutationFn: (data: RegisterScore) =>
      toast.promise(registerQuizScore(data), {
        loading: "Please wait...",
        success: "Your score has been registered.",
        error: (error: ApiError) => h("span", `${error.message}`),
      }),
  });

  return mutation;
};

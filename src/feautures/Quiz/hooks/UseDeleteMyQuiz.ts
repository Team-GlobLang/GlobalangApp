import { useMutation } from "@tanstack/vue-query";
import { h } from "vue";
import toast from "vue3-hot-toast";
import type { ApiError } from "../../../Core/types/ApiError";
import { removeQuiz } from "../service/QuizService";

export const UseDeleteMyQuiz = () => {
  const mutation = useMutation({
    mutationFn: (id: string) =>
      toast.promise(removeQuiz(id), {
        loading: "Please wait...",
        success: "Quiz deleted successfully!",
        error: (error: ApiError) => h("span", `${error.message}`),
      }),
  });

  return mutation;
};

import { useMutation } from "@tanstack/vue-query";
import toast from "vue3-hot-toast";
import { h } from "vue";
import type { ApiError } from "../../../Core/types/ApiError";
import { requestRecoveryCode } from "../Services/AuthServices";

export const UseRequestCode = () => {
  const mutation = useMutation({
    mutationFn: (email: string) =>
      toast.promise(requestRecoveryCode(email), {
        loading: "Please wait...",
        success: (message: string) => h("span", `${message}`),
        error: (error: ApiError) => h("span", `${error.message}`),
      }),
  });

  return mutation;
};

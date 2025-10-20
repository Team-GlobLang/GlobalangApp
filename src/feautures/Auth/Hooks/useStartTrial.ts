import { useMutation } from "@tanstack/vue-query";
import type { singInResponse } from "../Interfaces";
import toast from "vue3-hot-toast";
import { h } from "vue";
import type { ApiError } from "../../../Core/types/ApiError";
import { startTrial } from "../Services/AuthServices";

export const useStartTrial = () => {
  const mutation = useMutation({
    mutationFn: () =>
      toast.promise(startTrial(), {
        loading: "Please wait...",
        success: (response: singInResponse) => h("span", `${response.message}`),
        error: (error: ApiError) => h("span", `${error.message}`),
      }),
  });

  return mutation;
};

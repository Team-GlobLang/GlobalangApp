import { useMutation } from "@tanstack/vue-query";
import type { singInResponse } from "../Interfaces";
import toast from "vue3-hot-toast";
import { h } from "vue";
import type { ApiError } from "../../../Core/types/ApiError";
import { loginWithToken } from "../Services/AuthServices";

export const UseSingInWithToken = () => {
  const mutation = useMutation({
    mutationFn: () =>
      toast.promise(loginWithToken(), {
        loading: "Please wait...",
        success: (response: singInResponse) =>
          h("span", `Welcome back, ${response.user.fullName}!`),
        error: (error: ApiError) => h("span", `${error.message}`),
      }),
  });

  return mutation;
};

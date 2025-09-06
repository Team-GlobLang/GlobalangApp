import { useMutation } from "@tanstack/vue-query";
import type { LoginForm, singInResponse } from "../Interfaces";
import toast from "vue3-hot-toast";
import { h } from "vue";
import type { ApiError } from "../../../Core/types/ApiError";
import { singIn } from "../Services/AuthServices";

export const UseSingIn = () => {
  const mutation = useMutation({
    mutationFn: (data: LoginForm) =>
      toast.promise(singIn(data), {
        loading: 'Please wait...',
        success: (response: singInResponse) => h('span', `${response.message}`),
        error: (error: ApiError) => h('span', `${error.message}`),
      }),
  });

  return mutation;
};

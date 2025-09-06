import { useMutation } from "@tanstack/vue-query";
import type { RegisterForm } from "../Interfaces";
import toast from "vue3-hot-toast";
import type { ApiError } from "../../../Core/types/ApiError";
import { h } from "vue";
import { singUp } from "../Services/AuthServices";

export const UseSingUp = () => {
  const mutation = useMutation({
    mutationFn: (data: RegisterForm) =>
      toast.promise(
        singUp(data).then((response) => {
          return response;
        }),
        {
          loading: "Please wait...",
          success: h("span", `Registration successful! You can now log in.`),
          error: (error: ApiError) => h("span", `${error.message}`),
        }
      ),
  });

  return mutation;
};
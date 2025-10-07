import { useMutation } from "@tanstack/vue-query";
import { h } from "vue";
import toast from "vue3-hot-toast";
import type { ApiError } from "../../../Core/types/ApiError";
import { sendShort } from "../Services/shortService";

export const UseCreteShort = () => {
  const mutation = useMutation({
    mutationFn: (data: any) =>
      toast.promise(sendShort(data), {
        loading: "Please wait...",
        success: "Your application has been submitted successfully.",
        error: (error: ApiError) => h("span", `${error.message}`),
      }),
  });

  return mutation;
};
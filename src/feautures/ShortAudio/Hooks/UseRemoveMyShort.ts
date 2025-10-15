import { useMutation } from "@tanstack/vue-query";
import toast from "vue3-hot-toast";
import { h } from "vue";
import { RemoveShort } from "../Services/shortService";
import type { ApiError } from "../../../Core/types/ApiError";

export const useRemoveMyShort = () => {
  const mutation = useMutation({
    mutationFn: (id: string) =>
      toast.promise(RemoveShort(id), {
        loading: "Please wait...",
        success: "Short remove successfully!",
        error: (error: ApiError) =>
          h("span", `${error.message ?? "Removed failed"}`),
      }),
  });

  return mutation;
};

import { useMutation } from "@tanstack/vue-query";
import toast from "vue3-hot-toast";
import { h } from "vue";
import { createShort } from "../Services/shortService";
import type { ApiError } from "../../../Core/types/ApiError";

export const useCreateShort = () => {
    const mutation = useMutation({
        mutationFn: (data: any) => 
            toast.promise(createShort(data), {
                loading: "Please wait...",
                success: "Short created successfully!",
                error: (error: ApiError) => h("span", `${error.message ?? "Creation failed"}`),
            }),
    });

  return mutation;
};
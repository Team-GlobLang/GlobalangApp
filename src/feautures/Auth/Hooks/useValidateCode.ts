import { useMutation } from "@tanstack/vue-query";
import toast from "vue3-hot-toast";
import { verifyRecoveryCode } from "../Services/AuthServices";
import type { RecoveryCode } from "../Interfaces/RecoveryCodeInterface";
import type { ApiError } from "../../../Core/types/ApiError";
import { h } from "vue";

export const UseValidateCode = () => {
  const mutation = useMutation({
    mutationFn: (data: RecoveryCode) =>
      toast.promise(verifyRecoveryCode(data), {
        loading: "Please wait...",
        success: (message: string) => h("span", `${message}`),
        error: (error: ApiError) => h("span", `${error.message}`),
      }),
  });

  return mutation;
};

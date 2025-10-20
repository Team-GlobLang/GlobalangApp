import { useMutation } from "@tanstack/vue-query";
import { h } from "vue";
import toast from "vue3-hot-toast";
import type { ApiError } from "../../../Core/types/ApiError";
import { generatePaymentLink } from "../Service/UserService";

export const UseRedirectToPay = () => {
  const mutation = useMutation({
    mutationFn: () =>
      toast.promise(generatePaymentLink(), {
        loading: "Preparing your payment session...",
        success: "Payment link generated! Redirecting you now...",
        error: (error: ApiError) => h("span", `${error.message}`),
      }),
  });

  return mutation;
};

import { useMutation } from "@tanstack/vue-query";
import { h } from "vue";
import toast from "vue3-hot-toast";
import type { ApiError } from "../../../Core/types/ApiError";
import { sendCasualRequest } from "../Services/Colaborator.service";
import type { CasualRequestData } from "../Interfaces/send-casual-request.interface";

export const UseSendCasualColabRequest = () => {
  const mutation = useMutation({
    mutationFn: (data: CasualRequestData) =>
      toast.promise(sendCasualRequest(data), {
        loading: "Please wait...",
        success: "Your application has been submitted successfully.",
        error: (error: ApiError) => h("span", `${error.message}`),
      }),
  });

  return mutation;
};

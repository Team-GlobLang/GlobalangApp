import { useMutation } from "@tanstack/vue-query";
import { h } from "vue";
import toast from "vue3-hot-toast";
import type { ApiError } from "../../../Core/types/ApiError";
import type { SendRequestData } from "../Interfaces/send-join-request.interface";
import { sendJoinRequest } from "../Services/Colaborator.service";

export const UseSendJoinRequest = () => {
  const mutation = useMutation({
    mutationFn: (data: SendRequestData) =>
      toast.promise(sendJoinRequest(data), {
        loading: "Please wait...",
        success: "Your application has been submitted successfully.",
        error: (error: ApiError) => h("span", `${error.message}`),
      }),
  });

  return mutation;
};

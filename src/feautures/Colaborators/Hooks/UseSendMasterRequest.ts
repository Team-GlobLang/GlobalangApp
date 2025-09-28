import { useMutation } from "@tanstack/vue-query";
import { h } from "vue";
import toast from "vue3-hot-toast";
import type { ApiError } from "../../../Core/types/ApiError";
import type { MasterRequestData } from "../Interfaces/send-master-request.interface";
import { sendMasterRequest } from "../Services/Colaborator.service";

export const UseSendMasterRequest = () => {
  const mutation = useMutation({
    mutationFn: (data: MasterRequestData) =>
      toast.promise(sendMasterRequest(data), {
        loading: "Please wait...",
        success: "Your application has been submitted successfully.",
        error: (error: ApiError) => h("span", `${error.message}`),
      }),
  });

  return mutation;
};

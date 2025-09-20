import { useMutation } from "@tanstack/vue-query";
import toast from "vue3-hot-toast";
import { ChangeStatusColaboratorRequest } from "../Services/ColaboratorServices";
import { h } from "vue";
import type { ApiError } from "../../../Core/types/ApiError";
import type { ColaboratorRequestChangeStatus } from "../Interfaces/ColaboratorRequestChangeStatusInterface";

export const UseChangeRequestStatus = () => {
  const mutation = useMutation({
    mutationFn: (data: ColaboratorRequestChangeStatus) =>
      toast.promise(
        ChangeStatusColaboratorRequest(data).then((response) => {
          return response;
        }),
        {
          loading: "Please wait...",
          success: h("span", `Se realizo la acción exitosamente.`),
          error: (error: ApiError) => h("span", `${error.message}`),
        }
      ),
  });

  return mutation;
};

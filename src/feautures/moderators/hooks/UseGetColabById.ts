import { useMutation } from "@tanstack/vue-query";
import toast from "vue3-hot-toast";
import { h } from "vue";
import type { ColaboratorReponse } from "../Interfaces/ColaboratorReponse";
import type { ApiError } from "../../../Core/types/ApiError";
import { GetColaboratorRequestById } from "../Services/ColaboratorServices";

export const UseGetColabById = () => {
  const mutation = useMutation({
    mutationFn: (id: string) =>
      toast.promise(GetColaboratorRequestById(id), {
        loading: "Please wait ...",
        success: (response: ColaboratorReponse) =>
          h("span", `${response.message}`),
        error: (error: ApiError) => h("span", `${error.message}`),
      }),
  });
  return mutation;
};

import { useMutation } from "@tanstack/vue-query";
import toast from "vue3-hot-toast";
import { h } from "vue";
import type { ColaboratorReponse } from "../Interfaces/ColaboratorReponse";
import type { ApiError } from "../../../Core/types/ApiError";
import type { ColaboratorRequestFilters } from "../Interfaces/ColaboratorRequestFiltersInterface";
import { GetColaboratorRequestsFilters } from "../Services/ColaboratorServices";

export const UseGetColabsRequests = () => {
  const mutation = useMutation({
    mutationFn: (Data: ColaboratorRequestFilters) =>
      toast.promise(GetColaboratorRequestsFilters(Data), {
        loading: "Please wait ...",
        success: (response: ColaboratorReponse) =>
          h("span", `${response.message}`),
        error: (error: ApiError) => h("span", `${error.message}`),
      }),
  });
  return mutation;
};

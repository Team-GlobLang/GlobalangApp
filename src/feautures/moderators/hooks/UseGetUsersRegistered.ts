import { useMutation } from "@tanstack/vue-query";
import toast from "vue3-hot-toast";
import { h } from "vue";
import type { ColaboratorReponse } from "../Interfaces/ColaboratorReponse";
import type { ApiError } from "../../../Core/types/ApiError";
import type { getUsers } from "../Interfaces/getUsers.dto";
import { GetUsers } from "../Services/ModeatorServices";

export const UseGetUsersRegisterd = () => {
  const mutation = useMutation({
    mutationFn: (Data: getUsers) =>
      toast.promise(GetUsers(Data), {
        loading: "Please wait ...",
        success: (response: ColaboratorReponse) =>
          h("span", `${response.message}`),
        error: (error: ApiError) => h("span", `${error.message}`),
      }),
  });
  return mutation;
};

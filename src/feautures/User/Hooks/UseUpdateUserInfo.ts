import { useMutation } from "@tanstack/vue-query";
import { h } from "vue";
import toast from "vue3-hot-toast";
import type { ApiError } from "../../../Core/types/ApiError";
import type { updateUserInfo } from "../Interfaces/UserInterfaces";
import { updateUser } from "../Service/UserService";

export const UseUpdateUser = () => {
  const mutation = useMutation({
    mutationFn: (data: updateUserInfo) =>
      toast.promise(updateUser(data), {
        loading: "Please wait...",
        success: "Your profile has been updated!",
        error: (error: ApiError) => h("span", `${error.message}`),
      }),
  });

  return mutation;
};

import { useMutation } from "@tanstack/vue-query";
import { h } from "vue";
import toast from "vue3-hot-toast";
import { changePassword } from "../Service/UserService";
import type { ChangePasswordData } from "../Interfaces/UserInterfaces";

export const UseChangePassword = () => {
  const mutation = useMutation({
    mutationFn: (data: ChangePasswordData) =>
      toast.promise(changePassword(data), {
        loading: "Please wait...",
        success: "Password changed successfully!",
        error: (error: any) => h("span", `${error.message}`),
      }),
  });

  return mutation;
};

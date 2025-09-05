import { defineRule } from "vee-validate";
import { required, email as emailRule, min } from "@vee-validate/rules";

export const rules = {
  required: () => defineRule("required", required),
  email: () => defineRule("email", emailRule),
  min: () => defineRule("min", min),
};

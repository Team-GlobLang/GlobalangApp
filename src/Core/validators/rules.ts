import { defineRule } from "vee-validate";
import { required, email as emailRule, min } from "@vee-validate/rules";

export const rules = {
  required: () => defineRule("required", required),
  email: () => defineRule("email", emailRule),
  min: () => defineRule("min", min),
  matchesPassword: defineRule(
    "matchesPassword",
    (value: string, params: [string], ctx: { form: Record<string, any> }) => {
      const target = params[0];
      if (value === ctx.form[target]) return true;
      return "Password does not match";
    }
  ),
};

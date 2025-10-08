<template>
  <div class="p-5 bg-white shadow-lg rounded-2xl w-11/12">
    <h2 class="text-xl font-bold mb-4">Change Password</h2>

    <form @submit.prevent="submitForm" class="space-y-4">
      <FwbInput
        label="Current Password"
        :type="showPassword ? 'text' : 'password'"
        placeholder="Your current password"
        v-model="currentPassword"
        :validation-status="currentPasswordError ? 'error' : undefined"
      >
        <template #suffix>
          <span
            v-if="!showPassword"
            @click="changeShowPassword(true)"
            class="pi pi-eye hover:text-blue-600"
          ></span>
          <span
            v-else
            @click="changeShowPassword(false)"
            class="pi pi-eye-slash hover:text-blue-600"
          ></span>
        </template>
        <template #validationMessage>
          <span class="font-medium">{{ currentPasswordError }}</span>
        </template>
      </FwbInput>

      <FwbInput
        label="New Password"
        :type="showPassword ? 'text' : 'password'"
        placeholder="Your new password"
        v-model="newPassword"
        :validation-status="passwordError ? 'error' : undefined"
      >
        <template #suffix>
          <span
            v-if="!showPassword"
            @click="changeShowPassword(true)"
            class="pi pi-eye hover:text-blue-600"
          ></span>
          <span
            v-else
            @click="changeShowPassword(false)"
            class="pi pi-eye-slash hover:text-blue-600"
          ></span>
        </template>
        <template #validationMessage>
          <span class="font-medium">{{ passwordError }}</span>
        </template>
      </FwbInput>

      <FwbInput
        label="Repeat New Password"
        :type="showPassword ? 'text' : 'password'"
        placeholder="Repeat new password"
        v-model="repeatPassword"
        :validation-status="repeatPwdError ? 'error' : undefined"
      >
        <template #suffix>
          <span
            v-if="!showPassword"
            @click="changeShowPassword(true)"
            class="pi pi-eye hover:text-blue-600"
          ></span>
          <span
            v-else
            @click="changeShowPassword(false)"
            class="pi pi-eye-slash hover:text-blue-600"
          ></span>
        </template>
        <template #validationMessage>
          <span class="font-medium">{{ repeatPwdError }}</span>
        </template>
      </FwbInput>

      <FwbButton type="submit" :disabled="isPending">
        {{ isPending ? "Changing..." : "Change Password" }}
      </FwbButton>
    </form>
  </div>
</template>
<script setup lang="ts">
import { useField, useForm } from "vee-validate";
import { ref } from "vue";
import { FwbButton, FwbInput } from "flowbite-vue";
import { UseChangePassword } from "../Hooks/UseChangePassword";
import { rules } from "../../../Core/validators/rules";
import { useRouter } from "vue-router";
import type { ChangePasswordData } from "../Interfaces/UserInterfaces";

const showPassword = ref(false);
function changeShowPassword(show: boolean) {
  showPassword.value = show;
}

const { required, min } = rules;
[required, min].forEach((fn) => fn());

const { handleSubmit } = useForm<ChangePasswordData>();

const { value: currentPassword, errorMessage: currentPasswordError } = useField<
  ChangePasswordData["currentPassword"]
>("currentPassword", "required");

const { value: newPassword, errorMessage: passwordError } = useField<
  ChangePasswordData["newPassword"]
>("newPassword", "required|min:6");

const { value: repeatPassword, errorMessage: repeatPwdError } = useField<
  ChangePasswordData["repeatPassword"]
>("repeatPassword", "required|matchesPassword:newPassword");

const { mutate, isPending } = UseChangePassword();

const router = useRouter();
const submitForm = handleSubmit((values: ChangePasswordData) => {
  mutate(values, {
    onSuccess: () => {
      router.back();
    },
  });
});
</script>

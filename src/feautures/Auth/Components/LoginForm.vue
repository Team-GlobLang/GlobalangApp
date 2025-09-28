<template>
  <form @submit.prevent="submitForm" class="flex-col flex gap-5 w-3/4">
    <FwbInput label="Email" type="email" placeholder="your@email.com" v-model="email" @blur="emailBlur()"
      :validation-status="emailError ? 'error' : undefined">
      <template #suffix>
        <span class="pi pi-at"></span>
      </template>
      <template #validationMessage>
        <span class="font-medium"> {{ emailError }} </span>
      </template>
    </FwbInput>
    <FwbInput label="Password" :type="showPassword ? 'text' : 'password'" placeholder="Your password" v-model="password"
      @blur="passwordBlur" :validation-status="passwordError ? 'error' : undefined">
      <template #suffix>
        <span v-if="!showPassword" @click="changeShowPassword(true)" class="pi pi-eye hover:text-blue-600"></span>
        <span v-else @click="changeShowPassword(false)" class="pi pi-eye-slash hover:text-blue-600"></span>
      </template>
      <template #validationMessage>
        <span class="font-medium"> {{ passwordError }} </span>
      </template>
    </FwbInput>
    <RouterLink class="self-end" to="/forgetPassword">
      <FwbA class="hover:decoration-blue-600">
        <label class="hover:cursor-pointer text-sm hover:text-blue-600">Forgot your password?</label>
      </FwbA>
    </RouterLink>
    <FwbButton :disabled="isPending">
      Log In
    </FwbButton>
  </form>
</template>

<script lang="ts" setup>
import { FwbA, FwbButton, FwbInput } from 'flowbite-vue';
import { ref } from 'vue';
import type { LoginForm } from '../Interfaces/LoginInterface';
import { useField, useForm } from 'vee-validate';
import { rules } from '../../../Core/validators/rules';
import { UseSingIn } from '../Hooks/useSingIn';
import { useRouter } from 'vue-router';

const showPassword = ref<boolean>(false)
function changeShowPassword(show: boolean) {
  showPassword.value = show
}

const { required, email: emailRule, min } = rules;
[required, emailRule, min].forEach(fn => fn());

const { handleSubmit } = useForm<LoginForm>();

const { value: email, errorMessage: emailError, handleBlur: emailBlur } =
  useField<LoginForm['email']>('email', 'required|email');

const {
  value: password,
  errorMessage: passwordError,
  handleBlur: passwordBlur
} = useField<LoginForm['password']>('password', 'required|min:6');

const { mutate, isPending } = UseSingIn()

const router = useRouter()

const submitForm = handleSubmit((values) => {
  mutate(values, {
    onSuccess: () => { router.push({ name: "Home" }) }
  })
});

</script>
<template>
    <form @submit.prevent="submitForm" class="flex-col flex gap-3 w-3/4">
        <FwbInput v-model="fullName" type="text" :validation-status="fullNameError ? 'error' : undefined"
            @blur="fullNameBlur" label="Full name" placeholder="Full name">
            <template #suffix>
                <span class="pi pi-user"></span>
            </template>
            <template #validationMessage>
                <span class="font-medium">{{ fullNameError }} </span>
            </template>
        </FwbInput>

        <FwbInput v-model="country" type="text" :validation-status="countryError ? 'error' : undefined"
            @blur="countryBlur" label="Contry" placeholder="Ej: Costa Rica">
            <template #suffix>
                <span class="pi pi-home"></span>
            </template>
            <template #validationMessage>
                <span class="font-medium">{{ countryError }} </span>
            </template>

        </FwbInput>
        <FwbInput v-model="birthDate" :validation-status="birthDateError ? 'error' : undefined" @blur="birthDateBlur"
            label="Birth date" type="date">
            <template #validationMessage>
                <span class="font-medium"> </span>
            </template>
        </FwbInput>
        <FwbInput @blur="emailBlur" v-model="email" type="email" :validation-status="emailError ? 'error' : undefined"
            label="Email" placeholder="tu@Email.com">
            <template #suffix>
                <span class="pi pi-at"></span>
            </template>
            <template #validationMessage>
                <span class="font-medium"> {{ emailError }} </span>
            </template>
        </FwbInput>

        <FwbInput label="Password" :type="showPassword ? 'text' : 'password'" placeholder="Your password"
            v-model="password" @blur="passwordBlur" :validation-status="passwordError ? 'error' : undefined">
            <template #suffix>
                <span v-if="!showPassword" @click="changeShowPassword(true)"
                    class="pi pi-eye hover:text-blue-600"></span>
                <span v-else @click="changeShowPassword(false)" class="pi pi-eye-slash hover:text-blue-600"></span>
            </template>
            <template #validationMessage>
                <span class="font-medium"> {{ passwordError }} </span>
            </template>
        </FwbInput>
        <FwbInput label="Repet Password"  :type="showPassword ? 'text' : 'password'" placeholder="Your password"
            v-model="repeatPassword" @blur="repeatPasswordBlur"
            :validation-status="repeatPasswordError ? 'error' : undefined">
            <template #suffix>
                <span v-if="!showPassword" @click="changeShowPassword(true)"
                    class="pi pi-eye hover:text-blue-600"></span>
                <span v-else @click="changeShowPassword(false)" class="pi pi-eye-slash hover:text-blue-600"></span>
            </template>
            <template #validationMessage>
                <span class="font-medium"> {{ passwordError }} </span>
            </template>
        </FwbInput>
        <FwbButton>
            Register
        </FwbButton>
    </form>
</template>
<script setup lang="ts">
import { FwbButton, FwbInput } from 'flowbite-vue';
import { ref } from 'vue';
import { rules } from '../../../Core/validators/rules';
import type { RegisterForm } from '../Interfaces';
import { useField, useForm } from 'vee-validate';


const showPassword = ref<boolean>(false)
function changeShowPassword(show: boolean) {
    showPassword.value = show
}

const { required, email: emailRule, min } = rules;
[required, emailRule, min].forEach(fn => fn());

const { handleSubmit } = useForm<RegisterForm>();


const {
    value: password,
    errorMessage: passwordError,
    handleBlur: passwordBlur
} = useField<RegisterForm['password']>('password', 'required|min:6');
const {
    value: repeatPassword,
    errorMessage: repeatPasswordError,
    handleBlur: repeatPasswordBlur
} = useField<RegisterForm['repeatPassword']>('repeatPassword', 'required|min:6');

const { value: email, errorMessage: emailError, handleBlur: emailBlur } =
    useField<RegisterForm['email']>('email', 'required|email');

const { value: fullName, errorMessage: fullNameError, handleBlur: fullNameBlur } =
    useField<RegisterForm['fullName']>('fullName','required');

const { value: country, errorMessage: countryError, handleBlur: countryBlur } =
    useField<RegisterForm['country']>('conutry','required');

const { value: birthDate, errorMessage: birthDateError, handleBlur: birthDateBlur } =
    useField<RegisterForm['birthDate']>('birthDate','required');


const submitForm = handleSubmit((values) => {
  console.table(values);
});


</script>
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

        <FwbInput list="countries" v-model="country" type="text" :validation-status="countryError ? 'error' : undefined"
            @blur="countryBlur" label="Contry" placeholder="Ej: Costa Rica">
            <template #suffix>
                <span class="pi pi-home"></span>
            </template>
            <template #validationMessage>
                <span class="font-medium">{{ countryError }} </span>
            </template>
        </FwbInput>

        <datalist id="countries">
            <option v-for="countryItem in filteredCountries" :key="countryItem.code" :value="countryItem.name">
                {{ countryItem.name }}
            </option>
        </datalist>

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
        <FwbInput label="Repet Password" :type="showPassword ? 'text' : 'password'" placeholder="Your password"
            v-model="repeatPassword" :validation-status="passwordError ? 'error' : undefined">
            <template #suffix>
                <span v-if="!showPassword" @click="changeShowPassword(true)"
                    class="pi pi-eye hover:text-blue-600"></span>
                <span v-else @click="changeShowPassword(false)" class="pi pi-eye-slash hover:text-blue-600"></span>
            </template>
            <template #validationMessage>
                <span class="font-medium"> {{ passwordError }} </span>
            </template>
        </FwbInput>
        <FwbButton :disabled="isPending">
            Register
        </FwbButton>
    </form>
</template>
<script setup lang="ts">
import { FwbButton, FwbInput } from 'flowbite-vue';
import { computed, ref } from 'vue';
import { rules } from '../../../Core/validators/rules';
import type { RegisterForm } from '../Interfaces';
import { useField, useForm } from 'vee-validate';
import { countries } from '../../../Core/CountriesArray';
import { UseSingUp } from '../Hooks/useSingUp';
import router from '../../../router';

const MAX_INITIAL = 10;

const filteredCountries = computed(() => {
    if (!country.value) {
        return countries.slice(0, MAX_INITIAL);
    }
    return countries.filter(c =>
        c.name.toLowerCase().includes(country.value.toLowerCase())
    );
});

const showPassword = ref<boolean>(false)
function changeShowPassword(show: boolean) {
    showPassword.value = show
}

const { required, email: emailRule, min } = rules;
[required, emailRule, min].forEach(fn => fn());

const { handleSubmit } = useForm<RegisterForm>();

const repeatPassword = ref<string>()

const {
    value: password,
    errorMessage: passwordError,
    handleBlur: passwordBlur
} = useField<RegisterForm['password']>('password', 'required|min:6');

const { value: email, errorMessage: emailError, handleBlur: emailBlur } =
    useField<RegisterForm['email']>('email', 'required|email');

const { value: fullName, errorMessage: fullNameError, handleBlur: fullNameBlur } =
    useField<RegisterForm['fullName']>('fullName', 'required');

const { value: country, errorMessage: countryError, handleBlur: countryBlur } =
    useField<RegisterForm['country']>('country', 'required');

const { value: birthDate, errorMessage: birthDateError, handleBlur: birthDateBlur } =
    useField<RegisterForm['birthDate']>('birthDate', 'required');


const { mutate, isPending } = UseSingUp()

const submitForm = handleSubmit((values) => {
    console.table(values);
    mutate(values,
        {
            onSuccess: () => { router.push({ name: "Login" }) }
        }
    )

});




</script>
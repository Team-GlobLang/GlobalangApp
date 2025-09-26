<template>
    <form v-if="!expired" @submit.prevent="submitForm" class="flex-col flex gap-5 w-3/4">
        <FwbInput label="New Password" :type="showPassword ? 'text' : 'password'" placeholder="Your password"
            v-model="newPassword" :validation-status="passwordError ? 'error' : undefined">
            <template #suffix>
                <span v-if="!showPassword" @click="changeShowPassword(true)"
                    class="pi pi-eye hover:text-blue-600"></span>
                <span v-else @click="changeShowPassword(false)" class="pi pi-eye-slash hover:text-blue-600"></span>
            </template>
            <template #validationMessage>
                <span class="font-medium"> {{ passwordError }} </span>
            </template>
        </FwbInput>
        <FwbInput label="Repet Password" :type="showPassword ? 'text' : 'password'" placeholder="Repeat password"
            v-model="repeatPwdValue" :validation-status="repeatPwdError ? 'error' : undefined">
            <template #suffix>
                <span v-if="!showPassword" @click="changeShowPassword(true)"
                    class="pi pi-eye hover:text-blue-600"></span>
                <span v-else @click="changeShowPassword(false)" class="pi pi-eye-slash hover:text-blue-600"></span>
            </template>
            <template #validationMessage>
                <span class="font-medium"> {{ repeatPwdError }} </span>
            </template>
        </FwbInput>
        <div class="text-sm text-gray-600 text-center">
            For security, this page will remain available for
            <b>{{ formattedTime }}</b>.
        </div>
        <FwbButton :disabled="isPending">
            Confirm
        </FwbButton>
    </form>
    <div v-if="expired" class="text-red-500 text-center font-medium">
        The time to change your password has expired.
        <fwb-a @click="goTo()" class="text-blue-600 hover:underline">
            Please click here to request a new recovery code.
        </fwb-a>
    </div>
</template>
<script setup lang="ts">
import { useField, useForm } from 'vee-validate';
import type { changePasswordInterface } from '../Interfaces';
import { useRouter } from 'vue-router';
import { computed, onMounted, onUnmounted, ref, watch } from 'vue';
import { FwbButton, FwbInput, FwbA } from 'flowbite-vue';
import { rules } from '../../../Core/validators/rules';
import { UseChangePassword } from '../Hooks/ChangePassword';


const timeLeft = ref(8 * 60)
const expired = ref(false)
let interval: ReturnType<typeof setInterval> | null = null


onMounted(() => {
    interval = setInterval(() => {
        if (timeLeft.value > 0) {
            timeLeft.value--
        }
    }, 1000)
})

onUnmounted(() => {
    if (interval) clearInterval(interval)
})

const formattedTime = computed(() => {
    const minutes = Math.floor(timeLeft.value / 60)
    const seconds = timeLeft.value % 60
    return `${minutes}:${seconds.toString().padStart(2, '0')}`
})

const router = useRouter();
const showPassword = ref<boolean>(false)
const { required, min } = rules;
[required, min].forEach(fn => fn());
const { handleSubmit } = useForm<changePasswordInterface>();

function changeShowPassword(show: boolean) {
    showPassword.value = show
}

const { value: repeatPwdValue, errorMessage: repeatPwdError } = useField<string>(
    'repeatPassword',
    'required|matchesPassword:newPassword'
);
const {
    value: newPassword,
    errorMessage: passwordError
} = useField<changePasswordInterface['newPassword']>('newPassword', 'required|min:6');

const { mutate, isPending } = UseChangePassword()


const submitForm = handleSubmit((values) => {
    const { newPassword } = values
    mutate({ newPassword },
        {
            onSuccess: () => { router.push({ name: "Login" }) }
        }
    )
});

function goTo() {
    router.replace({ name: 'ForgetPassword' })
}

watch(timeLeft, (val) => {
    if (val === 0) {
        localStorage.removeItem('forgetToken')
        expired.value = true
    }
})

</script>

<template>
    <form @submit.prevent="sendCode" v-if="!codeSend" class=" flex-col flex gap-5 w-3/4">
        <p>Password Reset</p>
        <p>Enter your email, and we will send you a recovery code.</p>
        <FwbInput placeholder="your@email.com" v-model="email" label="Email"
            :validation-status="emailError ? 'error' : undefined">
            <template #suffix>
                <span class="pi pi-at"></span>
            </template>
            <template #validationMessage>
                <span class="font-medium"> {{ emailError }} </span>
            </template>
        </FwbInput>
        <FwbButton type="submit" :disabled="isPending">Send Code</FwbButton>
    </form>

    <form @submit.prevent="validateCode" v-if="codeSend" class="flex-col flex gap-5 w-3/4">
        <p>If you don’t receive it, check your spam folder or request a new code.</p>
        <button type="button"
            class="self-end hover:cursor-pointer text-blue-600 hover:text-blue-800 underline text-sm disabled:text-gray-400"
            :disabled="timer > 0" @click="resendCode">
            <span v-if="timer === 0">Resend code</span>
            <span v-else>Resend code in {{ timer }}s</span>
        </button>
        <FwbInput v-model="code" label="Recovery code" placeholder="Enter your code"
            :validation-status="codeError ? 'error' : undefined" @focus="clearCode">
            <template #suffix>
                <span class="pi pi-slack"></span>
            </template>
            <template #validationMessage>
                <span class="font-medium"> {{ codeError }} </span>
            </template>
        </FwbInput>
        <FwbButton :disabled="codePending" type="submit">
            Enter code
        </FwbButton>
    </form>
</template>
<script setup lang="ts">
import { FwbInput, FwbButton } from 'flowbite-vue';
import { useField, useForm } from 'vee-validate';
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { rules } from '../../../Core/validators/rules';
import type { RecoveryCode } from '../Interfaces/RecoveryCodeInterface';
import { UseRequestCode } from '../Hooks/useRequestCode';
import { UseValidateCode } from '../Hooks/useValidateCode';

const router = useRouter();
const { required, email: emailRule, min } = rules;
[required, emailRule, min].forEach(fn => fn());

const codeSend = ref<boolean>(false)
const timer = ref(0);
let interval: ReturnType<typeof setInterval> | null = null;

const { handleSubmit } = useForm<RecoveryCode>();
const { value: email, errorMessage: emailError } = useField<RecoveryCode['email']>('email', 'required|email');

const { value: code, errorMessage: codeError } = useField<RecoveryCode['code']>('code', 'required', {
    initialValue: 'xxxx'
});

const startTimer = () => {
    timer.value = 30;
    if (interval) clearInterval(interval);
    interval = setInterval(() => {
        if (timer.value > 0) {
            timer.value -= 1;
        } else {
            if (interval) clearInterval(interval);
        }
    }, 1000);
};

const { mutate, isPending } = UseRequestCode()
const { mutate: verifyCode, isPending: codePending } = UseValidateCode()

const sendCode = handleSubmit((values) => {
    mutate(values.email || "", {
        onSuccess: () => {
            codeSend.value = true;
            startTimer();
        }
    })
})

const clearCode = () => {
    code.value = '';
};
const resendCode = handleSubmit((values) => {
    mutate(values.email || "", {
        onSuccess: () => {
            codeSend.value = true;
            startTimer();
        }
    })
})

const validateCode = handleSubmit((values: RecoveryCode) => {

    verifyCode(values, {
        onSuccess: () => {
            router.push({ name: "ChangePassword" })
        }
    })


});


</script>

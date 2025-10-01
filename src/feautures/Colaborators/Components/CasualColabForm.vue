<template>
    <form name="joinMasterForm" @submit.prevent="submitForm" class=" flex gap-3 flex-col p-2 ">
        <FwbInput :validation-status="nameError ? 'error' : undefined" v-model="fullName" type="text" label="Full name"
            placeholder="Enter your full name">
            <template #suffix>
                <span class="pi pi-user"></span>
            </template <template #validationMessage>
            <template #validationMessage>
                <span class="font-medium">{{ nameError }} </span>
            </template>
        </FwbInput>

        <FwbInput :validation-status="emailError ? 'error' : undefined" v-model="email" label="Email"
            placeholder="Enter your email">
            <template #suffix>
                <span class="pi pi-at"></span>
            </template <template #validationMessage>
            <template #validationMessage>
                <span class="font-medium">{{ emailError }} </span>
            </template>
        </FwbInput>

        <FwbInput :validation-status="languagesError ? 'error' : undefined" v-model="languages" type="text"
            label="Languages" placeholder="Enter the languages you speak">
            <template #suffix>
                <span class="pi pi-user"></span>
            </template <template #validationMessage>
            <template #validationMessage>
                <span class="font-medium">{{ languagesError }} </span>
            </template>
        </FwbInput>

        <FwbInput :validation-status="numberError ? 'error' : undefined" v-model="phoneNumber" type="tel"
            label="Phone number" placeholder="Enter your phone number">
            <template #suffix>
                <span class="pi pi-language"></span>
            </template <template #validationMessage>
            <template #validationMessage>
                <span class="font-medium">{{ numberError }} </span>
            </template>
        </FwbInput>

        <FwbTextarea
            placeholder="We’d love to know you better. Tell us about yourself and what motivates you to join the Globalang community."
            type="text" label="About you">
        </FwbTextarea>

        <AudioRecorder v-model:file="record" :error-message="recordError" />

        <FwbButton :disabled="isPending" v-model="aboutColaborator" class="w-full">
            Send collaborator request
        </FwbButton>
    </form>
</template>
<script setup lang="ts">
import { FwbButton, FwbInput, FwbTextarea } from 'flowbite-vue';
import { rules } from '../../../Core/validators/rules';
import { useField, useForm } from 'vee-validate';
import AudioRecorder from './Microcomponents/AudioRecorder.vue';
import type { SendRequestData } from '../Interfaces/send-join-request.interface';
import { UseSendJoinRequest } from '../Hooks/UseSendJoinRequest';
import { useRouter } from 'vue-router';
const { required, email: emailRule, min } = rules;
[required, emailRule, min].forEach(fn => fn());


const { handleSubmit } = useForm<SendRequestData>();

const { value: fullName, errorMessage: nameError } =
    useField<SendRequestData['fullName']>('fullName', 'required');
const { value: email, errorMessage: emailError } =
    useField<SendRequestData['email']>('email', 'required|email');
const { value: languages, errorMessage: languagesError } =
    useField<SendRequestData['languages']>('languages', 'required');
const { value: phoneNumber, errorMessage: numberError } =
    useField<SendRequestData['phoneNumber']>('phoneNumber', 'required');
const { value: aboutColaborator } =
    useField<SendRequestData['aboutColaborator']>('aboutColaborator')
const { value: record, errorMessage: recordError } = useField<SendRequestData['files']>(
    'files',
    'required'
)


const { mutate, isPending } = UseSendJoinRequest()

const router = useRouter()

const submitForm = handleSubmit((values) => {
    const { files, ...rest } = values;

    const filesArray: File[] = Array.isArray(files)
        ? files
        : files
            ? [files]
            : [];

    mutate({
        ...rest,
        files: filesArray,
        category: "COLABORATOR"
    },
        {
            onSuccess: () => router.push({ name: "Home" })
        });
});


</script>
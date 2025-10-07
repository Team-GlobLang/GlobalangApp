<template>
    <form name="joinMasterForm" @submit.prevent="submitForm" class=" flex gap-3 flex-col p-2 ">
        <FwbInput :validation-status="nameError ? 'error' : undefined" v-model="text" type="text" label="Phrase"
            placeholder="Enter your phrase">
            <template #validationMessage>
                <span class="font-medium">{{ nameError }} </span>
            </template>
        </FwbInput>

        <FwbInput :validation-status="emailError ? 'error' : undefined" v-model="description" label="Description"
            placeholder="Enter the description of the prhase">
            <template #validationMessage>
                <span class="font-medium">{{ emailError }} </span>
            </template>
        </FwbInput>

        <FwbInput :validation-status="languagesError ? 'error' : undefined" v-model="country" type="text"
            label="country" placeholder="Enter the country">
            <template #validationMessage>
                <span class="font-medium">{{ languagesError }} </span>
            </template>
        </FwbInput>

        <AudioRecorder v-model:file="record" :error-message="recordError" />

        <FwbButton :disabled="isPending" class="w-full">
            Send prhase
        </FwbButton>
    </form>
</template>
<script setup lang="ts">
import { FwbButton, FwbInput } from 'flowbite-vue';
import { useField, useForm } from 'vee-validate';
import { useRouter } from 'vue-router';
import { rules } from '../../../../Core/validators/rules';
import { UseCreteShort } from '../../Hooks/useCreateShort';
import AudioRecorder from '../../../Colaborators/Components/Microcomponents/AudioRecorder.vue';
const { required, email: emailRule, min } = rules;
[required, emailRule, min].forEach(fn => fn());

interface CreateShort{
    text: string;
    country: string;
    description: string;
    files: File;
}

const { handleSubmit } = useForm<CreateShort>();

const { value: text, errorMessage: nameError } =
    useField<CreateShort['text']>('text', 'required');
const { value: description, errorMessage: emailError } =
    useField<CreateShort['description']>('description', 'required');
const { value: country, errorMessage: languagesError } =
    useField<CreateShort['country']>('country', 'required');
const { value: record, errorMessage: recordError } = useField<CreateShort['files']>(
    'files',
    'required'
)


const { mutate, isPending } = UseCreteShort()

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
    },
        {
            onSuccess: () => router.push({ name: "Home" })
        });
});


</script>
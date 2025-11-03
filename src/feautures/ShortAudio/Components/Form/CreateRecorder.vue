<template>
  <form name="joinMasterForm" @submit.prevent="submitForm" class=" flex gap-3 flex-col p-2 ">
    <FwbInput :validation-status="textError ? 'error' : undefined" v-model="text" type="text" label="Phrase"
      placeholder="Enter your phrase" >
      <template #validationMessage>
        <span class="font-medium">{{ textError }}</span>
      </template>
    </FwbInput>
    
    <CountrySelector
      v-model:country="country"
      :error="countryError"
    />

    <LanguageSelector
      v-model:language="writtenIn"
      :error="languageError"
    />

    <FwbInput :validation-status="descriptionError ? 'error' : undefined" v-model="description" 
      label="Description" placeholder="Enter a brief description" class="mt-2 mb-2">
      <template #validationMessage>
        <span class="front-medium">{{ descriptionError }}</span>
      </template>
    </FwbInput>

    <RecordAudio v-model:file="record" :error-message="recordError"/>

    <FwbButton :disabled="isPending" class="w-full mt-3">
        Send prhase
    </FwbButton>
  </form>
</template>

<script setup lang="ts">
import { useField, useForm } from 'vee-validate';
import { useRouter } from 'vue-router';
import { FwbButton, FwbInput } from 'flowbite-vue';
import RecordAudio from '../Recorder/RecordAudio.vue';
import { useCreateShort } from '../../Hooks/useCreateShort';
import { rules } from '../../../../Core/validators/rules';
import CountrySelector from '@components/CountrySelector.vue';
import LanguageSelector from '@components/LanguageSelector.vue';
const { required, min } = rules;
[required, min].forEach(fn => fn());

interface CreateShort{
    text: string;
    country: string;
    description: string;
    files: File;
    writtenIn: string;
}

const { handleSubmit } = useForm<CreateShort>();

const { value: text, errorMessage: textError } =
    useField<CreateShort['text']>('text', 'required');
const { value: description, errorMessage: descriptionError } =
    useField<CreateShort['description']>('description', 'required');
const { value: country, errorMessage: countryError } =
    useField<CreateShort['country']>('country', 'required');
const { value: record, errorMessage: recordError } = 
    useField<CreateShort['files']>( 'files', 'required')
const { value: writtenIn, errorMessage: languageError } =
    useField<CreateShort['country']>('writtenIn', 'required');


const { mutate, isPending} = useCreateShort();

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
            onSuccess: () => router.push({ name: "shorts-home" })
        });
});

</script>

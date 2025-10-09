<template>
  <form name="teacherRequestForm" @submit.prevent="submitForm" class="flex gap-3 flex-col p-2">
    <FwbInput
      :validation-status="textError ? 'error' : undefined"
      v-model="text"
      type="text"
      label="Teacher Request"
      placeholder="Write your request..."
    >
      <template #validationMessage>
        <span class="font-medium">{{ textError }}</span>
      </template>
    </FwbInput>

    <RecordAudio v-model:file="record" :error-message="recordError" />

    <FwbButton :disabled="isPending" class="w-full mt-3">
      Send request
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
const { required } = rules;
[required].forEach(fn => fn());

interface CreateShort {
  text: string;
  files: File;
}

const { handleSubmit } = useForm<CreateShort>();

const { value: text, errorMessage: textError } = useField<CreateShort['text']>('text', 'required');
const { value: record, errorMessage: recordError } = useField<CreateShort['files']>('files', 'required');

const { mutate, isPending } = useCreateShort();
const router = useRouter();

const submitForm = handleSubmit((values) => {
  const { files, ...rest } = values;
  const filesArray: File[] = Array.isArray(files) ? files : files ? [files] : [];
  mutate(
    { ...rest, files: filesArray },
    { onSuccess: () => router.push({ name: 'Home' }) }
  );
});
</script>

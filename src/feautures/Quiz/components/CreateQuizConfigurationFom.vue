<template>
    <div class=" p-4 rounded-lg space-y-4">

        <h2 class="text-xl font-semibold">Quiz Configuration</h2>

        <FwbInput v-model="quiz.name" label="Quiz Name" placeholder="Enter quiz name"
            :validation-status="nameError ? 'error' : undefined">
            <template #validationMessage>{{ nameError }}</template>
        </FwbInput>

        <FwbInput v-model="countryModel" list="countries" type="text" label="Search by country"
            placeholder="E.g.: Costa Rica">
            <template #suffix>
                <span class="pi pi-home"></span>
            </template>
        </FwbInput>

        <datalist id="countries">
            <option v-for="countryItem in filteredCountries" :key="countryItem.code" :value="countryItem.name">
                {{ countryItem.name }}
            </option>
        </datalist>


        <FwbTextarea v-model="quiz.description" label="Description" placeholder="Enter a short description"
            :validation-status="descriptionError ? 'error' : undefined">
            <template #validationMessage>{{ descriptionError }}</template>
        </FwbTextarea>

        <div class="flex gap-2 w-full">
            <div class="flex-1">
                <FwbInput class="w-full" type="number" v-model="timeNumber" label="Time Limit"
                    placeholder="Enter a number" min="1" :validation-status="timeError ? 'error' : undefined">
                    <template #validationMessage>{{ timeError }}</template>
                </FwbInput>
            </div>
            <FwbSelect :options="unitOptions" v-model="timeUnit" label="Unit" class="w-24" />
        </div>
    </div>
</template>

<script setup lang="ts">
import { computed, ref, watch } from 'vue';
import { FwbInput, FwbSelect, FwbTextarea } from 'flowbite-vue';
import type { Quiz } from '../types/quizTypes';
import { countries } from '@core/CountriesArray';

const unitOptions = [
    { value: 'M', name: 'Minutes' },
    { value: 'H', name: 'Hours' },
];

const props = defineProps<{
    modelValue: Quiz;
}>();

const emit = defineEmits<{
    (e: 'update:modelValue', value: Quiz): void;
}>();

const quiz = props.modelValue;

const timeNumber = ref(quiz.configuration.timeLimit.slice(0, -1) || '5');
const timeUnit = ref(quiz.configuration.timeLimit.slice(-1) || 'M');

const nameError = ref('');
const descriptionError = ref('');
const timeError = ref('');

watch([timeNumber, timeUnit], () => {
    quiz.configuration.timeLimit = `${timeNumber.value}${timeUnit.value}`;
    emit('update:modelValue', quiz);
});

const validateConfig = (): { valid: boolean; errors: string[] } => {
    const errors: string[] = [];

    if (!quiz.name.trim()) {
        nameError.value = 'Quiz name is required.';
        errors.push(nameError.value);
    } else if (quiz.name.trim().length < 3) {
        nameError.value = 'Name must be at least 3 characters.';
        errors.push(nameError.value);
    } else {
        nameError.value = '';
    }

    if (quiz.description.trim() && quiz.description.trim().length < 10) {
        descriptionError.value = 'Description must be at least 10 characters.';
        errors.push(descriptionError.value);
    } else {
        descriptionError.value = '';
    }

    // Time
    const num = Number(timeNumber.value);
    if (!num || num < 1) {
        timeError.value = 'Time must be at least 1.';
        errors.push(timeError.value);
    } else {
        timeError.value = '';
    }

    return { valid: errors.length === 0, errors };
};

watch(
    () => [quiz.name, quiz.description, timeNumber.value],
    () => validateConfig(),
    { deep: true }
);

const MAX_INITIAL = 10;

const countryModel = computed({
    get: () => quiz.country,
    set: (val: string) => {
        quiz.country = val;
        emit('update:modelValue', quiz);
    },
});


const filteredCountries = computed(() => {
    if (!countryModel.value) {
        return countries.slice(0, MAX_INITIAL);
    }
    return countries.filter(c =>
        c.name.toLowerCase().includes(countryModel.value.toLowerCase())
    );
});

defineExpose({ validateConfig });
</script>

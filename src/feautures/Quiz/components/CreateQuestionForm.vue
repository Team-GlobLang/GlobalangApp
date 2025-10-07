<template>
    <div class="relative py-3 rounded-xl space-y-4 ">

        <h3 class="text-lg pl-3 font-semibold text-gray-700 mb-2">
            Question {{ question.order + 1 }}
        </h3>
        <button type="button"
            class="absolute top-3 right-3 text-red-500 font-bold text-xl hover:text-red-600 transition"
            @click="$emit('delete-question')" title="Delete question">
            ×
        </button>

        <div class="px-6">
            <FwbSelect v-model="question.questionType" label="Question Type" :options="questionTypes" class="w-full" />

            <FwbInput v-model="question.questionText" label="Question Text" placeholder="Enter the question"
                :validation-status="questionTextError ? 'error' : undefined">
                <template #validationMessage>{{ questionTextError }}</template>
            </FwbInput>

            <FwbTextarea v-model="question.explanation" label="Explanation" placeholder="Optional explanation"
                :validation-status="explanationError ? 'error' : undefined">
                <template #validationMessage>{{ explanationError }}</template>
            </FwbTextarea>

            <div class="mt-4">
                <label class="flex items-center gap-2 mb-2">
                    <input type="checkbox" v-model="showAudio" class="accent-blue-500" />
                    Attach Audio (Optional)
                </label>

                <div v-if="showAudio">
                    <AudioRecorder v-model="question.file" class="w-full" :key="currentStep" />
                </div>
            </div>

            <div class="mt-4">
                <label class="font-semibold mb-2 block">Options (Max 4)</label>
                <div v-for="(opt, index) in question.options" :key="index" class="flex items-center gap-3 mb-2">
                    <input type="text" v-model="opt.text" placeholder="Option text"
                        class="flex-1 border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400" />

                    <label class="flex items-center gap-1">
                        <input :type="question.questionType === 'single_selection' ? 'radio' : 'checkbox'"
                            :name="'correct-' + question.order" :checked="opt.isCorrect"
                            @change="setCorrect(opt, index)" class="accent-blue-500" />
                        Correct
                    </label>

                    <button type="button" @click="removeOption(index)"
                        class="text-red-500 hover:text-red-600 transition" title="Remove option">
                        <i class="pi pi-trash"></i>
                    </button>
                </div>

                <button type="button"
                    class="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded transition disabled:bg-gray-300"
                    @click="addOption" :disabled="question.options.length >= 4">
                    Add Option
                </button>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue';
import { FwbInput, FwbSelect, FwbTextarea } from 'flowbite-vue';
import type { Question } from '../types/quizTypes';
import AudioRecorder from './microcomponents/AudioRecorder.vue';

const props = defineProps<{ question: Question, currentStep: number }>();
const localFile = ref(props.question.file);

watch(localFile, (val) => {
    props.question.file = val;
}, { immediate: true });
const showAudio = ref(false);

const questionTypes = [
    { value: 'single_selection', name: 'Single Selection' },
    { value: 'multiple_selection', name: 'Multiple Selection' },
];

const optionModel = ref<number | null>(null);

const questionTextError = ref('');
const explanationError = ref('');

watch(() => props.question.questionText, (val) => {
    if (!val.trim()) {
        questionTextError.value = 'The question text is required.';
    } else {
        questionTextError.value = '';
    }
});

watch(() => props.question.explanation, (val) => {
    if (val.length > 300) {
        explanationError.value = 'Explanation must be under 300 characters.';
    } else {
        explanationError.value = '';
    }
});

watch(() => props.question.options, (opts) => {
    if (props.question.questionType === 'single_selection') {
        const correctIndex = opts.findIndex(o => o.isCorrect);
        optionModel.value = correctIndex >= 0 ? correctIndex : null;
    }
}, { immediate: true });

const setCorrect = (opt: any, index: number) => {
    if (props.question.questionType === 'multiple_selection') {
        opt.isCorrect = !opt.isCorrect;
    } else {
        props.question.options.forEach((o, i) => o.isCorrect = i === index);
        optionModel.value = index;
    }
};

const addOption = () => {
    if (props.question.options.length >= 4) return;
    props.question.options.push({
        text: '',
        isCorrect: false,
        order: props.question.options.length
    });
};

const removeOption = (index: number) => {
    props.question.options.splice(index, 1);
};

const validateQuestion = (): { valid: boolean; errors: string[] } => {
    const errors: string[] = [];

    if (!props.question.questionText.trim()) errors.push('Question text is required');
    const correctOptions = props.question.options.filter(o => o.isCorrect);

    if (correctOptions.length === 0) errors.push('At least one correct option is required');
    if (props.question.questionType === 'single_selection' && correctOptions.length > 1)
        errors.push('Only one correct option allowed for single selection');

    return { valid: errors.length === 0, errors };
};


defineExpose({ validateQuestion });
</script>

<template>
    <div
        class="bg-white shadow p-4 mb-1 rounded-xl flex items-end sm:flex-row sm:justify-between sm:items-center gap-4">
        <div class="flex-1">
            <h3 class="text-lg font-semibold">{{ quiz.name }}</h3>
            <p class="text-gray-600">{{ quiz.description }}</p>
            <div class=" mt-2 text-sm flex-col text-gray-500 flex justify-between w-full sm:w-auto">
                <span>By: {{ quiz.creator }}</span>
                <span>From: {{ quiz.country }}</span>
                <span>Questions: {{ quiz.numberOfQuestions }}</span>
            </div>
        </div>
        <div>
            <FwbButton color="green" @click="onAttemptQuiz">
                Attempt Quiz
            </FwbButton>
        </div>
    </div>
</template>

<script setup lang="ts">
import { FwbButton } from 'flowbite-vue';
import type { QuizData } from '../../types/quizTypes';


const props = defineProps<{
    quiz: QuizData
}>();

const emit = defineEmits<{
    (e: 'attempt', id: string): void
}>();

const onAttemptQuiz = () => {
    emit('attempt', props.quiz.id);
};
</script>

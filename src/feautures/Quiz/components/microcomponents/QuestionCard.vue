<template>
    <div class="p-6 bg-white rounded-2xl shadow-lg mb-6 max-w-3xl mx-auto">
        <h2 class="text-xl font-semibold mb-6 text-gray-800">{{ question.questionText }}</h2>

      <div v-if="question.fileUrl" class="mb-4">
      <p class="text-sm text-gray-600 italic mb-1">🔊 Listen to the audio before answering:</p>
      <audio controls :src="question.fileUrl" class="w-full">
        Your browser does not support the audio element.
      </audio>
    </div>

        <div class="space-y-4">
            <button v-for="option in question.options" :key="option.id" @click="selectOption(option)"
                class="w-full text-left px-5 py-3 rounded-2xl border border-gray-300 bg-white hover:bg-blue-50 hover:border-blue-300 transition-all duration-200 shadow-sm flex items-center justify-between"
                :class="{
                    'bg-blue-100 border-blue-400 shadow-md scale-105': selectedOption === option
                }">
                <span class="text-gray-700 font-medium">{{ option.text }}</span>
                <span v-if="selectedOption === option" class="text-blue-600 font-bold">✓</span>
            </button>
        </div>

        <div class="flex justify-end mt-6">
            <button @click="nextQuestion"
                class="px-6 py-2 bg-blue-600 text-white font-semibold rounded-2xl hover:bg-blue-700 transition-all duration-200 shadow-md disabled:bg-gray-300 disabled:text-gray-500 disabled:cursor-not-allowed"
                :disabled="!selectedOption">
                Next
            </button>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import type { QuizQuestion, QuizOption } from '../../types/QuestionTypes';

interface Props {
    question: QuizQuestion
    nextQuestionHandler: (selectedOption: QuizOption | null) => void
}

const props = defineProps<Props>()

const selectedOption = ref<QuizOption | null>(null)

const selectOption = (option: QuizOption) => {
    selectedOption.value = option
}

const nextQuestion = () => {
    props.nextQuestionHandler(selectedOption.value)
    selectedOption.value = null
}
</script>

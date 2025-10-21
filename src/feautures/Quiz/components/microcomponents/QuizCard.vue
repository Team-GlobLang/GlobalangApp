<template>
  <div
    class="bg-white shadow p-4 mb-1 rounded-xl flex items-end sm:flex-row sm:justify-between sm:items-center gap-4"
  >
    <div class="flex-1">
      <h3 class="text-lg font-semibold">{{ quiz.name }}</h3>
      <p class="text-gray-600 line-clamp-2">{{ quiz.description }}</p>
      <div
        class="mt-2 text-sm flex-col text-gray-500 flex justify-between w-full sm:w-auto"
      >
        <span><strong>By:</strong> {{ quiz.creator }}</span>
        <span><strong>From:</strong> {{ quiz.country }}</span>
        <span><strong>Questions:</strong> {{ quiz.numberOfQuestions }}</span>
        <span
          ><strong>Time limit:</strong>
          {{ formatTimeLimit(quiz.configuration.timeLimit) }}</span
        >
      </div>
    </div>
    <div>
      <FwbButton color="green" @click="onAttemptQuiz"> Attempt Quiz </FwbButton>
    </div>
  </div>
</template>

<script setup lang="ts">
import { FwbButton } from "flowbite-vue";
import type { QuizData } from "../../types/quizTypes";

const props = defineProps<{
  quiz: QuizData;
}>();

const emit = defineEmits<{
  (e: "attempt", id: string): void;
}>();

const onAttemptQuiz = () => {
  emit("attempt", props.quiz.id);
};
const formatTimeLimit = (time: string) => {
  if (!time) return "";
  const value = parseInt(time.slice(0, -1));
  const unit = time.slice(-1).toUpperCase();
  if (unit === "M") return `${value} minute${value > 1 ? "s" : ""}`;
  if (unit === "H") return `${value} hour${value > 1 ? "s" : ""}`;
  return time;
};
</script>

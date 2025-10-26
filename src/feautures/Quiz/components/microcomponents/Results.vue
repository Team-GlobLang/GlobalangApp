<template>
  <div
    class="p-6 bg-white rounded-2xl shadow-lg max-w-md mx-auto mt-10 text-center"
  >
    <img src="/Results.png" alt="Result Image" class="mx-auto mb-4 w-24 h-24" />
    <h2 class="text-2xl font-bold mb-2">Quiz Completed!</h2>
    <p class="mb-4 text-gray-700">{{ resultMessage }}</p>

    <div class="mb-6 space-y-2 text-gray-800">
      <p><strong>Total Questions:</strong> {{ totalQuestions }}</p>
      <p><strong>Correct Answers:</strong> {{ correctAnswers }}</p>
      <p><strong>Score:</strong> {{ scorePercentage }}%</p>
    </div>

    <div class="flex justify-center gap-4 mb-6">
      <FwbButton @click="openModal = true" class=""> 🔄 Repeat Quiz </FwbButton>
      <FwbButton @click="handleExit" color="dark"> 🚪 Exit </FwbButton>
    </div>

    <div class="mt-4">
      <FwbButton @click="showReview = !showReview" color="alternative">
        {{ showReview ? "Hide Review" : "Show Review" }}
      </FwbButton>

      <div v-if="showReview">
        <div
          v-for="(q, index) in questions"
          :key="q.id"
          class="mb-4 p-4 bg-gray-50 rounded-lg shadow"
        >
          <h3 class="font-semibold">{{ index + 1 }}. {{ q.questionText }}</h3>
          <ul class="list-disc list-inside mt-1">
            <li
              v-for="opt in q.options"
              :key="opt.id"
              :class="{
                'text-green-700 font-semibold': opt.isCorrect,
                'text-red-600 line-through':
                  userAnswers[index]?.id === opt.id && !opt.isCorrect,
              }"
            >
              {{ opt.text }}
            </li>
          </ul>
          <p v-if="q.explanation" class="mt-1 text-gray-600 italic">
            Explanation: {{ q.explanation }}
          </p>
        </div>
      </div>
    </div>
    <RetryQuizMd
      v-if="openModal"
      :open="!!openModal"
      @update:open="(val: boolean) => openModal = val"
      @onRetry="handleRetry"
      @onExit="handleExit"
    />
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from "vue";
import { useRouter } from "vue-router";
import type { QuizOption, QuizQuestion } from "../../types/QuestionTypes";
import { FwbButton } from "flowbite-vue";
import RetryQuizMd from "../RetryQuizMd.vue";
import { UseRegisterScore } from "../../hooks/UseRegisterScore";

interface Props {
  questions: QuizQuestion[];
  userAnswers: (QuizOption | null)[];
  quizId: string;
  quizCountry: string;
}

const props = defineProps<Props>();

const emit = defineEmits(["onExit", "onRetry"]);
const router = useRouter();
const showReview = ref(false);

const totalQuestions = computed(() => props.questions.length);
const correctAnswers = computed(
  () => props.userAnswers.filter((a) => a?.isCorrect).length
);
const scorePercentage = computed(() =>
  Math.round((correctAnswers.value / totalQuestions.value) * 100)
);

const resultMessage = computed(() => {
  if (scorePercentage.value === 100) return "🎉 Excellent! Perfect score!";
  if (scorePercentage.value >= 70) return "👍 Good job! Keep it up!";
  if (scorePercentage.value >= 40) return "🙂 Not bad, try again!";
  return "😕 Better luck next time!";
});

const handleRetry = () => {
  openModal.value = false;
  router.replace(`/quiz/info/${props.quizId}`);
};

const { mutate } = UseRegisterScore();

const handleExit = () => {
  openModal.value = false;
  mutate(
    { score: scorePercentage.value, country: props.quizCountry },
    {
      onSuccess: () => router.replace("/quiz/availables"),
    }
  );
};
const openModal = ref<boolean>(false);
</script>

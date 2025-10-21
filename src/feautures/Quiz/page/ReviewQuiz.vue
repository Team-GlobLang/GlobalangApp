<template>
  <div class="w-full flex flex-col items-center gap-3">
    <div class=" w-full  p-2">
        <BreadCrumb :items="breadcrumbItems"/>
    </div>
    <div class="w-11/12 p-4 bg-white rounded-2xl shadow-md">
      <div class="flex justify-between items-center mb-6">
        <h2 class="text-2xl font-semibold text-gray-900 dark:text-gray-100">
          Quiz Preview
        </h2>
        <FwbButton color="light" @click="onCompleted">Return</FwbButton>
      </div>

      <div
        v-if="isPending"
        class="text-center py-8 text-gray-500 dark:text-gray-400"
      >
        Loading quiz data...
      </div>

      <div v-else>
        <div class="mb-6 border-b pb-4">
          <h3
            class="text-xl font-semibold mb-3 text-gray-800 dark:text-gray-200"
          >
            Configuration
          </h3>
          <div
            class="grid grid-cols-1 sm:grid-cols-2 gap-2 text-gray-600 dark:text-gray-300"
          >
            <p><strong>Name:</strong> {{ quiz?.name }}</p>
            <p><strong>Description:</strong> {{ quiz?.description }}</p>
            <p>
              <strong>Time Limit:</strong> {{ quiz?.configuration.timeLimit }}
            </p>
            <p>
              <strong>Shuffle Questions:</strong>
              {{ quiz?.configuration.shuffleQuestions ? "Yes" : "No" }}
            </p>
          </div>
        </div>

        <div>
          <h3
            class="text-xl font-semibold mb-4 text-gray-800 dark:text-gray-200"
          >
            Questions
          </h3>

          <div
            v-for="(q, index) in questions"
            :key="index"
            class="border border-gray-200 dark:border-gray-700 rounded-xl p-4 mb-4 bg-gray-50 dark:bg-gray-900 transition hover:shadow-md"
          >
            <h4 class="font-medium text-gray-900 dark:text-gray-100 mb-2">
              Question #{{ index + 1 }}
            </h4>

            <p class="text-gray-700 dark:text-gray-300 mb-2">
              {{ q.questionText }}
            </p>
            <p class="text-sm text-gray-500 dark:text-gray-400 mb-1">
              Type: {{ q.questionType }}
            </p>
            <p class="text-sm text-gray-500 dark:text-gray-400 mb-3">
              Explanation: {{ q.explanation }}
            </p>

            <audio
              v-if="q.fileUrl"
              :src="q.fileUrl"
              controls
              class="w-full mb-3"
            ></audio>

            <ul class="list-disc pl-5 space-y-1">
              <li
                v-for="opt in q.options"
                :key="opt.order"
                :class="[
                  'text-sm',
                  opt.isCorrect
                    ? 'text-green-600 dark:text-green-400 font-medium'
                    : 'text-gray-600 dark:text-gray-300',
                ]"
              >
                {{ opt.text }}
                <span v-if="opt.isCorrect" class="ml-1">(Correct)</span>
              </li>
            </ul>
          </div>
        </div>

        <div class="mt-6 flex justify-end">
          <FwbButton color="green" @click="onCompleted">Go back</FwbButton>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useRoute, useRouter } from "vue-router";
import { useQuery } from "@tanstack/vue-query";
import { getQuiz, getQuizQuestions } from "../service/QuizService";
import type { QuizQuestion } from "../types/QuestionTypes";
import type { Quiz } from "../types/quizTypes";
import { computed } from "vue";
import { FwbButton } from "flowbite-vue";
import BreadCrumb from "@layouts/BreadCrumb.vue";

const breadcrumbItems = [
  { label: "Home", route: "/home", isHome: true },
  { label: "...", route: "/studio/quiz" },
  { label: "My Quizzes", route: "/studio/quiz/my-quiz" },
  { label: "Review Quiz" },
];

const route = useRoute();
const quizId = route.params.id as string;

const { data: quizData, isPending: quizPending } = useQuery<Quiz>({
  queryKey: [`quiz-${quizId}`],
  queryFn: () => getQuiz(quizId),
});

const { data: questionsData, isPending: questionsPending } = useQuery<{
  questions: QuizQuestion[];
}>({
  queryKey: ["quizQuestions", quizId],
  queryFn: () => getQuizQuestions(quizId),
});

const quiz = computed(() => quizData.value);
const questions = computed<QuizQuestion[]>(
  () => questionsData.value?.questions || []
);
const isPending = quizPending || questionsPending;

const router = useRouter();

const onCompleted = () => {
  router.back();
};
</script>

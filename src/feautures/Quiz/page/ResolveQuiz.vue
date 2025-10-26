<template>
  <div :class="containerHeight" class="p-5 w-full flex flex-col">

    <div class=" flex">
      <div class="w-full">
        <BreadCrumb :items="breadcrumbItems" />
      </div>
      <div class="w-full mb-4 text-right font-semibold text-gray-700 text-lg">
        Time left: {{ formatTime(timeLeft) }}
      </div>
    </div>

    <div class="flex-1 flex flex-col items-center justify-center w-full">

      <div v-if="isPending" class="animate-pulse space-y-4 w-11/12 max-w-3xl">
        <div class="h-6 bg-gray-300 rounded w-3/4"></div>
        <div class="h-4 bg-gray-200 rounded w-full"></div>
        <div class="h-4 bg-gray-200 rounded w-full"></div>
      </div>

      <div v-else-if="currentQuestion" class="w-11/12 max-w-3xl">

        <QuestionCard :question="currentQuestion" :nextQuestionHandler="handleNext" />

        <div class="mt-2 text-gray-600 text-right">
          Question {{ currentIndex + 1 }} / {{ shuffledQuestions.length }}
        </div>
      </div>

      <div v-else class="w-11/12 max-w-3xl">
        <Results :questions="shuffledQuestions" :userAnswers="userAnswers" :quizId="quizId" :quizCountry="country" />
      </div>
    </div>
  </div>
</template>


<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { useRoute } from 'vue-router'
import { useQuery } from '@tanstack/vue-query'
import { getQuizQuestions } from '../service/QuizService'
import type { QuizQuestion, QuizOption } from '../types/QuestionTypes'
import QuestionCard from '../components/microcomponents/QuestionCard.vue'
import BreadCrumb from '@layouts/BreadCrumb.vue'
import Results from '../components/microcomponents/Results.vue'
import { Capacitor } from '@capacitor/core';

const isNative = Capacitor.isNativePlatform();

const containerHeight = computed(() =>
   isNative ? 'min-h-[95dvh]' : 'min-h-screen'
);

const route = useRoute()
const quizId = computed(() => route.params.id as string)
const timeLimit = Number(route.query.timeLimit) || 3600
const country = String(route.query.quizCountry)

const { data, isPending } = useQuery<{ questions: QuizQuestion[] }>({
  queryKey: [`quiz-${quizId.value}`],
  queryFn: () => getQuizQuestions(quizId.value)
})

const questions = computed<QuizQuestion[]>(() => data.value?.questions || [])

function shuffleArray<T>(array: T[]): T[] {
  const arr = [...array]
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
      ;[arr[i], arr[j]] = [arr[j], arr[i]]
  }
  return arr
}

const shuffledQuestions = computed(() => shuffleArray(questions.value))

const currentIndex = ref(0)
const score = ref(0)
const userAnswers = ref<(QuizOption | null)[]>([])

const currentQuestion = computed<QuizQuestion | null>(
  () => shuffledQuestions.value[currentIndex.value] || null
)

const timeLeft = ref(timeLimit)
let timer: ReturnType<typeof setInterval> | null = null

onMounted(() => {
  timer = setInterval(() => {
    if (timeLeft.value > 0) {
      timeLeft.value--
    } else {
      finishQuiz()
    }
  }, 1000)
})

onUnmounted(() => {
  if (timer) clearInterval(timer)
})

const handleNext = (selectedOption: QuizOption | null) => {
  userAnswers.value[currentIndex.value] = selectedOption
  if (selectedOption?.isCorrect) score.value++

  if (currentIndex.value < shuffledQuestions.value.length - 1) {
    currentIndex.value++
  } else {
    finishQuiz()
  }
}

const finishQuiz = () => {
  if (timer) clearInterval(timer)
  currentIndex.value = -1
}

const breadcrumbItems = computed(() => [
  { label: 'Home', route: '/home', isHome: true }
])

const formatTime = (seconds: number) => {
  const m = Math.floor(seconds / 60)
  const s = seconds % 60
  const mm = m.toString().padStart(2, '0')
  const ss = s.toString().padStart(2, '0')
  return `${mm}:${ss}`
}

</script>

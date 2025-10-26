<template>
    <div>
        <div class="w-full p-2">
            <BreadCrumb :items="breadcrumbItems" />
        </div>

        <div class="p-5 mx-3 bg-white shadow-lg rounded-2xl">
            <div v-if="showSkeleton" class="space-y-10 animate-pulse h-fit">
                <div class="h-8 bg-gray-300 rounded w-3/4"></div>
                <div class="h-6 bg-gray-200 rounded w-full"></div>
                <hr class="my-4" />
                <div class="space-y-3">
                    <div class="h-5 bg-gray-300 rounded w-1/2"></div>
                    <div class="h-5 bg-gray-300 rounded w-1/3"></div>
                    <div class="h-5 bg-gray-300 rounded w-2/3"></div>
                </div>
                <hr class="my-4" />
                <div class="space-y-2">
                    <div class="h-4 bg-gray-200 rounded w-full"></div>
                    <div class="h-4 bg-gray-200 rounded w-full"></div>
                    <div class="h-4 bg-gray-200 rounded w-5/6"></div>
                    <div class="h-4 bg-gray-200 rounded w-2/3"></div>
                </div>
                <div class="space-y-2">
                    <div class="h-4 bg-gray-200 rounded w-full"></div>
                    <div class="h-4 bg-gray-200 rounded w-full"></div>
                    <div class="h-4 bg-gray-200 rounded w-5/6"></div>
                    <div class="h-4 bg-gray-200 rounded w-2/3"></div>
                </div>
                <div class="flex justify-between mt-6">
                    <div class="h-10 w-20 bg-gray-300 rounded"></div>
                    <div class="h-10 w-32 bg-gray-300 rounded"></div>
                </div>
            </div>

            <div v-else>
                <h1 class="text-3xl font-bold text-gray-900 mb-2">{{ quiz.name }}</h1>
                <p class="text-gray-600 mb-6">{{ quiz.description }}</p>

                <hr class="mb-6" />

                <div class="space-y-4 text-gray-800">
                    <div>
                        <h2 class="font-semibold text-lg">🕒 Time Limit</h2>
                        <p>
                            This quiz has a time limit of
                            <strong>{{ formatTimeLimit(quiz.configuration.timeLimit) }}</strong>.
                            Make sure to answer all questions before time runs out.
                        </p>
                    </div>

                    <div>
                        <h2 class="font-semibold text-lg">❓ Number of Questions</h2>
                        <p>
                            This quiz contains <strong>{{ quiz.numberOfQuestions }}</strong>
                            {{ quiz.numberOfQuestions === 1 ? 'question' : 'questions' }}.
                        </p>
                    </div>

                    <div>
                        <h2 class="font-semibold text-lg">👤 Creator</h2>
                        <p>
                            Created by <strong>{{ quiz.creator }}</strong> from {{ quiz.country }}.
                        </p>
                    </div>
                </div>

                <hr class="my-8" />

                <div class="bg-blue-50 border border-blue-200 p-4 rounded-xl mb-8">
                    <h2 class="font-semibold text-lg text-blue-700 mb-2">📘 Quiz Rules</h2>
                    <ul class="list-disc list-inside text-gray-700 space-y-1">
                        <li>Read each question carefully before answering.</li>
                        <li>You cannot pause the quiz once it begins.</li>
                        <li>You cannot go back or skip between questions — each must be answered in order.</li>
                        <li>Your final score and explanations will be shown after completing the quiz.</li>
                    </ul>
                </div>

                <div class="flex justify-between mt-6">
                    <button @click="goBack" class="px-4 py-2 rounded-xl bg-gray-200 hover:bg-gray-300 transition">
                        ← Prev
                    </button>

                    <button @click="startQuiz"
                        class="px-6 py-2 rounded-xl bg-blue-600 text-white font-semibold hover:bg-blue-700 transition">
                        🚀  Start Quiz
                    </button>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useQuery } from '@tanstack/vue-query'
import { getQuiz } from '../service/QuizService'
import BreadCrumb from '@layouts/BreadCrumb.vue'

const route = useRoute()
const router = useRouter()
const quizId = computed(() => route.params.id as string)

const showSkeleton = computed(() => isPending.value || !quiz.value || isLoading.value)

const { data, isPending, isLoading } = useQuery({
    queryKey: [`quiz-${quizId}`],
    queryFn: () => getQuiz(quizId.value)
})

const quiz = computed(() => data.value)

function parseTimeLimit(time: string): number {
    if (!time) return 3600

    const unit = time.slice(-1).toUpperCase()
    const value = parseInt(time.slice(0, -1))

    if (isNaN(value)) return 60

    switch (unit) {
        case 'M':
            return value * 60
        case 'H':
            return value * 3600
        default:
            return value
    }
}

const timeLimitInSeconds = computed(() => {
    if (!quiz.value) return 3600
    return parseTimeLimit(quiz.value.configuration.timeLimit)
})


const startQuiz = () => {
    if (!quiz.value) return
    router.push({
        name: 'ResolveQuiz',
        params: { id: quiz.value.id },
        query: { timeLimit: timeLimitInSeconds.value }
    })
}

const goBack = () => router.back()


const breadcrumbItems = computed(() => [
    { label: "Home", route: "/home", isHome: true },
    { label: "Available Quizzes", route: "/quiz/availables" },
    quiz.value
        ? {
            label: quiz.value.name.length > 11 ? quiz.value.name.slice(0, 11) + "..." : quiz.value.name,
            route: `/quiz/info/${quiz.value.id}`
        }
        : { label: "Loading...", route: "#" }
])

const formatTimeLimit = (time: string) => {
    if (!time) return "";
    const value = parseInt(time.slice(0, -1));
    const unit = time.slice(-1).toUpperCase();
    if (unit === "M") return `${value} minute${value > 1 ? "s" : ""}`;
    if (unit === "H") return `${value} hour${value > 1 ? "s" : ""}`;
    return time;
};
</script>

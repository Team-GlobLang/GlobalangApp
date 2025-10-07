<template>
  <div class=" w-full flex flex-col justify-center items-center">
    <div class=" w-full p-2">
      <BreadCrumb :items="breadcrumbItems" />
    </div>
    <div class=" w-11/12 flex flex-col gap-3 ">

      <!-- Title -->
      <h1 class="text-3xl font-bold">Quiz Studio</h1>
      <p class="text-gray-500 text-base">
        Welcome to your quiz control center. Create, explore, or manage your quizzes easily.
      </p>

      <!-- Main action section -->
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
        <!-- Create Quiz -->
        <div @click="goto('NewQuiz')"
          class="p-6 bg-blue-100 rounded-2xl hover:bg-blue-200 cursor-pointer transition flex flex-col items-center justify-center">
          <span class="text-4xl mb-4">✏️</span>
          <h2 class="text-xl font-semibold">Create Quiz</h2>
          <p class="text-gray-600 text-sm text-center mt-2">
            Start a new quiz from scratch or use a template.
          </p>
        </div>

        <!-- My Quizzes -->
        <div @click="goto('MyQuiz')"
          class="p-6 bg-green-100 rounded-2xl hover:bg-green-200 cursor-pointer transition flex flex-col items-center justify-center">
          <span class="text-4xl mb-4">📚</span>
          <h2 class="text-xl font-semibold">My Quizzes</h2>
          <p class="text-gray-600 text-sm text-center mt-2">
            View and edit the quizzes you've created.
          </p>
        </div>

        <!-- Explore Quizzes -->
        <div @click="goto('QuizList')"
          class="p-6 bg-purple-100 rounded-2xl hover:bg-purple-200 cursor-pointer transition flex flex-col items-center justify-center">
          <span class="text-4xl mb-4">🌐</span>
          <h2 class="text-xl font-semibold">Explore Quizzes</h2>
          <p class="text-gray-600 text-sm text-center mt-2">
            Discover public quizzes or quizzes from other users.
          </p>
        </div>
      </div>

      <!-- Latest quizzes carousel -->
      <div class="space-y-2">
        <h2 class="text-2xl font-semibold">Your Latest Quizzes</h2>
        <MyQuizCarrousel />
      </div>

    </div>
  </div>
</template>

<script setup lang="ts">
import BreadCrumb from "@layouts/BreadCrumb.vue";
import MyQuizCarrousel from "../components/microcomponents/MyQuizCarrousel.vue";
import { useRouter } from "vue-router";

const breadcrumbItems = [
  { label: "Home", route: "/home", isHome: true },
  { label: "Quiz Studio", route: "/studio/quiz" },
];

const router = useRouter()

function goto(path: string) {
  router.push({ name: path })
}

</script>

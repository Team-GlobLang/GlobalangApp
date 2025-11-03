<template>
  <div class="w-full flex flex-col items-center">
    <div class="w-full p-2">
      <BreadCrumb :items="breadcrumbItems" />
    </div>

    <div class="w-11/12 min-h-[80dvh] justify-center flex flex-col gap-6">
      <p class="text-gray-700 text-lg md:text-xl text-center">
        Welcome to your studio. Choose where to start!
      </p>

      <div class="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <div
          v-if="userRole !== 'COLLABORATOR'"
          @click="goToQuiz"
          class="p-6 bg-gradient-to-br from-blue-200 to-blue-300 rounded-2xl shadow-lg hover:shadow-2xl cursor-pointer transition transform hover:-translate-y-1 flex flex-col items-center justify-center"
        >
          <span class="text-5xl mb-4">✏️</span>
          <h2 class="text-xl font-bold mb-2">Quizzes</h2>
          <p class="text-gray-700 text-center text-sm">
            Create, edit, and explore quizzes.
          </p>
        </div>

        <div
          @click="goToShorts"
          class="p-6 bg-gradient-to-br from-green-200 to-green-300 rounded-2xl shadow-lg hover:shadow-2xl cursor-pointer transition transform hover:-translate-y-1 flex flex-col items-center justify-center"
        >
          <span class="text-5xl mb-4">🎵</span>
          <h2 class="text-xl font-bold mb-2">Shorts</h2>
          <p class="text-gray-700 text-center text-sm">
            Record, upload, and explore short audios.
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import BreadCrumb from "@layouts/BreadCrumb.vue";
import { userStore } from "@UserStore";
import { computed, onMounted } from "vue";
import { useRouter } from "vue-router";

const breadcrumbItems = [
  { label: "Home", route: "/home", isHome: true },
  { label: "Studio", route: "/studio" },
];

const router = useRouter();

const userRole = computed(() => userStore.user!.role || "COLLABORATOR");

onMounted(() => {
  if (userRole.value === "colaborador") {
    router.push({ name: "QuizStudio" });
  }
});

const goToQuiz = () => {
  router.push({ name: "QuizStudio" });
};

const goToShorts = () => {
  router.push({ name: "shorts-home" });
};
</script>

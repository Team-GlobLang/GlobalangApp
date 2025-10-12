<template>
  <div class="w-full flex flex-col justify-center items-center">
    <div class="w-full p-2">
      <BreadCrumb :items="breadcrumbItems" />
    </div>

    <div class="w-11/12 flex flex-col gap-3">
      <p class="text-gray-500 text-base">
        Welcome to your short-audio control center. Create, explore, or manage
        your shorts easily.
      </p>

      <div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <div
          @click="goto('CreateShort')"
          class="p-6 bg-blue-100 rounded-2xl hover:bg-blue-200 cursor-pointer transition flex flex-col items-center justify-center"
        >
          <span class="text-4xl mb-4">✏️</span>
          <h2 class="text-xl font-semibold">Create Short</h2>
          <p class="text-gray-600 text-sm text-center mt-2">
            Record a new short audio from scratch.
          </p>
        </div>

        <div
          @click="goto('Short-audio')"
          class="p-6 bg-purple-100 rounded-2xl hover:bg-purple-200 cursor-pointer transition flex flex-col items-center justify-center"
        >
          <span class="text-4xl mb-4">🌐</span>
          <h2 class="text-xl font-semibold">Explore Shorts</h2>
          <p class="text-gray-600 text-sm text-center mt-2">
            Discover public shorts from other users.
          </p>
        </div>

        <div>
          <RouterLink
            :to="{ name: 'my-shorts' }"
            class="p-6 bg-green-100 rounded-2xl hover:bg-green-200 transition flex flex-col items-center justify-center cursor-pointer text-center"
          >
            <span class="text-4xl mb-4">📚</span>
            <h2 class="text-xl font-semibold">My Shorts</h2>
            <p class="text-gray-600 text-sm mt-2">
              View and manage the shorts you have created.
            </p>
          </RouterLink>
        </div>
      </div>

      <div>
        <h2 class="text-2xl font-semibold">Recently Created Shorts</h2>
        <MyRecentShorts/>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import BreadCrumb from "@layouts/BreadCrumb.vue";
import { RouterLink, useRouter } from "vue-router";
import MyRecentShorts from "../Components/Carrousel/MyRecentShorts.vue";

const breadcrumbItems = [
  { label: "Home", route: "/home", isHome: true },
  { label: "Studio", route: "/studio" },
  { label: "Short Studio", route: "/studio/short" },
];

const router = useRouter();

function goto(name: string) {
  router.push({ name });
}
</script>

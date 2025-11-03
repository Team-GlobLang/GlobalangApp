<template>
  <div
    class="w-full min-h-screen flex flex-col gap-y-4 items-center bg-gradient-to-br from-white to-blue-100 p-4"
  >
    <MyInfo />
    <LanguageSelector v-model:country="country" />

    <WorldMap v-model:country="country" />

    <LatestPhrases :country="country" />

    <div class="w-full">
      <RouterLink :to="{ name: 'Favorite-Shorts' }">
        <div
          class="bg-white shadow-lg rounded-2xl p-4 flex items-center gap-4 hover:shadow-2xl transition-transform transform"
        >
          <div class="flex-shrink-0 bg-red-100 rounded-full p-3">
            <svg
              class="w-10 h-10 text-red-500"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 
                4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 
                14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 
                6.86-8.55 11.54L12 21.35z"
              />
            </svg>
          </div>

          <div class="flex flex-col">
            <h3 class="text-lg font-semibold text-gray-800">Favorite Shorts</h3>
            <p class="text-gray-500 text-sm">
              Access all your saved favorite shorts quickly
            </p>
          </div>

          <div class="ml-auto text-gray-400">
            <svg
              class="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M9 5l7 7-7 7"
              />
            </svg>
          </div>
        </div>
      </RouterLink>
    </div>

    <ColabsRedirections />

    <FreeTrialModal />
  </div>
</template>
<script setup lang="ts">
import { ref } from "vue";
import WorldMap from "../Components/WorldMap.vue";
import MyInfo from "../Components/MyInfo.vue";
import ColabsRedirections from "../Components/ColabsRedirections.vue";
import LanguageSelector from "../Components/microcomponents/LanguageSelector.vue";
import LatestPhrases from "../Components/LatestPhrases.vue";
import FreeTrialModal from "../Components/modals/FreeTrialModal.vue";
import { RouterLink } from "vue-router";

const country = ref("");
</script>

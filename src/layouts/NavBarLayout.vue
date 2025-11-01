<template>
  <div
    class="fixed bottom-0 left-0 z-50 w-full bg-white shadow-md border-t border-gray-200"
  >
    <FwbButtonGroup class="flex justify-around w-full h-14">
      <FwbButton
        v-if="userRole !== 'BASIC'"
        class="relative w-full !rounded-none outline-none focus:ring-0 py-3"
        :class="selectedPath === 'studio' ? 'text-black' : 'text-white'"
        @click="goto('Studio')"
      >
        <RouterLink to="/studio">
          <span
            v-if="selectedPath === 'studio'"
            class="absolute top-0 left-1/2 -translate-x-1/2 w-8 h-1 bg-black rounded-full"
          ></span>
          <i
            style="font-size: 1.7rem"
            class="pi pi-file-arrow-up text-2xl transition-transform duration-500 ease-in-out"
            :class="selectedPath === 'studio' ? ' rotate-6' : 'rotate-0'"
          ></i>
        </RouterLink>
      </FwbButton>

      <FwbButton
        class="relative w-full !rounded-none outline-none focus:ring-0 py-3"
        :class="selectedPath === 'quiz' ? 'text-black' : 'text-white'"
        @click="goto('Quizzes')"
      >
        <span
          v-if="selectedPath === 'quiz'"
          class="absolute top-0 left-1/2 -translate-x-1/2 w-8 h-1 bg-black rounded-full"
        ></span>
        <i
          style="font-size: 1.7rem"
          class="pi pi-clipboard text-2xl transition-transform duration-500 ease-in-out"
          :class="selectedPath === 'quiz' ? ' rotate-6' : 'rotate-0'"
        ></i>
      </FwbButton>

      <FwbButton
        class="relative w-full !rounded-none outline-none focus:ring-0 py-3"
        :class="
          selectedPath === 'home' || selectedPath === 'user'
            ? 'text-black'
            : 'text-white'
        "
        @click="goto('Home')"
      >
        <span
          v-if="selectedPath === 'home' || selectedPath === 'user'"
          class="absolute top-0 left-1/2 -translate-x-1/2 w-8 h-1 bg-black rounded-full"
        ></span>
        <i
          style="font-size: 1.7rem"
          class="pi pi-th-large text-2xl transition-transform duration-500 ease-in-out"
          :class="
            selectedPath === 'home' || selectedPath === 'user'
              ? ' rotate-6'
              : 'rotate-0'
          "
        ></i>
      </FwbButton>

      <FwbButton
        class="relative w-full !rounded-none outline-none focus:ring-0 py-3"
        :class="selectedPath === 'short' ? 'text-black' : 'text-white'"
        @click="goto('Short-audio')"
      >
        <span
          v-if="selectedPath === 'short'"
          class="absolute top-0 left-1/2 -translate-x-1/2 w-8 h-1 bg-black rounded-full"
        ></span>
        <i
          style="font-size: 1.7rem"
          class="pi pi-headphones text-2xl transition-transform duration-500 ease-in-out"
          :class="selectedPath === 'short' ? ' rotate-6' : 'rotate-0'"
        ></i>
      </FwbButton>

      <FwbButton
        class="relative w-full !rounded-none outline-none focus:ring-0 py-3"
        :class="selectedPath === 'ranking' ? 'text-black' : 'text-white'"
        @click="goto('Ranking')"
      >
        <span
          v-if="selectedPath === 'ranking'"
          class="absolute top-0 left-1/2 -translate-x-1/2 w-8 h-1 bg-black rounded-full"
        ></span>
        <i
          style="font-size: 1.7rem"
          class="pi pi-trophy text-2xl transition-transform duration-500 ease-in-out"
          :class="selectedPath === 'user' ? ' rotate-6' : 'rotate-0'"
        ></i>
      </FwbButton>
    </FwbButtonGroup>
  </div>
</template>

<script setup lang="ts">
import { computed } from "vue";
import { FwbButton, FwbButtonGroup } from "flowbite-vue";
import { useRoute, useRouter } from "vue-router";
import { userStore } from "../Stores/user";

const userRole = computed(() => userStore.user?.role || "BASIC");

const router = useRouter();
const route = useRoute();
const selectedPath = computed(() => {
  const segments = route.path.split("/").filter(Boolean);
  return segments[0] || "";
});

function goto(pathName: string) {
  router.push({ name: pathName });
}
</script>

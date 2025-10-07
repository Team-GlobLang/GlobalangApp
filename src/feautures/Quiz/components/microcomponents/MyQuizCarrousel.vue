<template>
  <div>
    <Carousel :value="quizzes" :numVisible="3" :numScroll="1" :responsiveOptions="responsiveOptions" :circular="true"
      :showNavigators="false" :autoplayInterval="4200">
      <template #item="slotProps">
        <div class="shadow bg-white rounded-2xl p-4 transition flex flex-col justify-between h-full">
          <div class="flex justify-between items-center mb-2">
            <h3 class="font-semibold text-lg">{{ slotProps.data.name }}</h3>
            <FwbBadge :type="getBadgeType(slotProps.data.isApproved)">
              {{ getApprovalText(slotProps.data.isApproved) }}
            </FwbBadge>
          </div>
          <p class="text-gray-500 text-sm mb-4">{{ slotProps.data.description }}</p>
          <div class="flex flex-col text-sm text-gray-700">
            <span><strong>Time limit:</strong> {{ slotProps.data.configuration.timeLimit }}</span>
            <span><strong># Questions:</strong> {{ slotProps.data.questions?.length ?? 0 }}</span>
          </div>
        </div>
      </template>
    </Carousel>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import Carousel from "primevue/carousel";
import { FwbBadge } from "flowbite-vue";

const quizzes = ref([
  {
    id: "1",
    name: "Math Quiz",
    description: "Test your knowledge of algebra and geometry.",
    configuration: { timeLimit: "5M", shuffleQuestions: true },
    isApproved: null,
    questions: [1, 2, 3, 4, 5],
  },
  {
    id: "2",
    name: "World History",
    description: "Review important events from around the world.",
    configuration: { timeLimit: "10M", shuffleQuestions: false },
    isApproved: true,
    questions: [1, 2, 3, 4, 5, 6],
  },
  {
    id: "3",
    name: "Basic English",
    description: "Practice your vocabulary and grammar.",
    configuration: { timeLimit: "7M", shuffleQuestions: true },
    isApproved: false,
    questions: [1, 2, 3],
  }
]);

const responsiveOptions = ref([
  { breakpoint: "1400px", numVisible: 3, numScroll: 1 },
  { breakpoint: "1199px", numVisible: 3, numScroll: 1 },
  { breakpoint: "767px", numVisible: 2, numScroll: 1 },
  { breakpoint: "575px", numVisible: 1, numScroll: 1 },
]);

const getBadgeType = (isApproved: boolean | null) => {
  if (isApproved === null) return "yellow"; // pending
  if (isApproved === false) return "red";   // rejected
  return "green";                            // approved
};

const getApprovalText = (isApproved: boolean | null) => {
  if (isApproved === null) return "Pending";
  if (isApproved === false) return "Rejected";
  return "Approved";
};
</script>

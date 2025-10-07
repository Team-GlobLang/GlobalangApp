<template>
  <div>
    <Carousel v-if="!isLoading" :value="quizzes" :numVisible="3" :numScroll="1" :responsiveOptions="responsiveOptions"
      :circular="true" :showNavigators="false" :autoplayInterval="4200">
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
            <span><strong># Questions:</strong> {{ slotProps.data.numberOfQuestions ?? 0 }}</span>
          </div>
        </div>
      </template>
    </Carousel>

    <div v-else class="grid grid-cols-1 md:grid-cols-3 gap-4">
      <div class="animate-pulse shadow bg-gray-200 rounded-2xl p-4 h-52"></div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from "vue";
import { useQuery } from "@tanstack/vue-query";
import Carousel from "primevue/carousel";
import { FwbBadge } from "flowbite-vue";
import { getMyQuizzes } from "../../service/QuizService";

const responsiveOptions = [
  { breakpoint: "1400px", numVisible: 3, numScroll: 1 },
  { breakpoint: "1199px", numVisible: 3, numScroll: 1 },
  { breakpoint: "767px", numVisible: 2, numScroll: 1 },
  { breakpoint: "575px", numVisible: 1, numScroll: 1 },
];

const { data, isLoading } = useQuery({
  queryKey: ["quizzes", { limit: 5 }],
  queryFn: async () => await getMyQuizzes({ limit: 5 }),
  staleTime: 1000 * 60 * 5,
});

const quizzes = computed(() => data.value?.data ?? []);

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

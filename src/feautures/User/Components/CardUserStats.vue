<template>
  <div
    v-if="isLoading"
    class="p-5 bg-white shadow rounded-xl w-full max-w-sm animate-pulse"
  >
    <div class="h-19 bg-gray-200 rounded mb-2"></div>
    <div class="h-10 bg-gray-200 rounded mb-2"></div>
    <div class="h-6 bg-gray-200 rounded"></div>
  </div>

  <div v-else-if="data" class="p-6 bg-white shadow rounded-xl w-11/12">
    <h2 class="text-xl font-bold mb-4">User Statistics</h2>

    <div class="flex justify-between mb-2">
      <span>Total quizzes:</span>
      <span>{{ data.totalQuizzes }}</span>
    </div>

    <div class="flex justify-between mb-2">
      <span>Average score:</span>
      <span>{{ data.averageScore }}%</span>
    </div>

    <div class="mt-4 p-3 bg-blue-50 rounded">
      <p>{{ message }}</p>
    </div>
  </div>

  <div v-else class="p-6 bg-white shadow rounded-xl w-11/12">
    <p>No statistics available</p>
  </div>
</template>

<script setup lang="ts">
import { useQuery } from "@tanstack/vue-query";
import type { UserStats } from "../Interfaces/StatsInterfaces";
import { computed } from "vue";
import { userStore } from "@UserStore";
import { getUserStats } from "../Service/StatsService";

const userId = computed(() => userStore.user!.id);

const { data, isLoading } = useQuery<UserStats>({
  queryKey: ["stats", userId.value],
  queryFn: () => getUserStats(userId.value),
  enabled: !!userId.value,
});

const message = computed(() => {
  const score = data.value?.averageScore;

  if (score === undefined || score === null) return "Sin información";
  if (score >= 90) return "¡Excelente desempeño!";
  if (score >= 70) return "Buen trabajo, sigue así.";
  if (score >= 50) return "Podés mejorar, ánimo.";
  return "Necesitas práctica adicional.";
});
</script>

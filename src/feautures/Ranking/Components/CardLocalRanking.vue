<template>
  <div class="p-5 bg-white shadow-lg rounded-2xl w-11/12">
    <h2 class="text-2xl font-bold mb-4 text-center">
      🏆 Local Top - {{ country }}
    </h2>

    <div v-if="isLoading" class="space-y-2 animate-pulse">
      <div v-for="n in 4" :key="n" class="h-10 bg-gray-200 rounded-xl"></div>
    </div>

    <div v-else>
      <div
        v-for="(user, index) in data"
        :key="user.fullName"
        class="flex justify-between items-center mb-2 p-3 rounded-xl shadow-sm hover:shadow-md transition-shadow bg-gray-50"
      >
        <div class="flex items-center gap-3">
          <span class="text-lg">
            {{ getMedal(index) }}
          </span>
          <span class="font-medium">{{ user.fullName }}</span>
        </div>
        <div class="text-right">
          <div class="text-sm text-gray-500">
            {{ user.totalQuizzes }} quizzes
          </div>
          <div class="font-bold text-blue-600">{{ user.averageScore }}%</div>
        </div>
      </div>

      <div
        v-if="!data || data.length === 0"
        class="p-3 text-gray-500 text-center"
      >
        No users to display
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useQuery } from "@tanstack/vue-query";
import type { UsersStats } from "../../User/Interfaces/StatsInterfaces";
import { computed } from "vue";
import { userStore } from "@UserStore";
import { getTopLocal } from "../Service/Ranking";

const country = computed(() => userStore.user!.country);

const { data, isLoading } = useQuery<UsersStats[]>({
  queryKey: ["top-local", country.value],
  queryFn: () => getTopLocal(country.value),
  enabled: !!country,
});

function getMedal(index: number): string {
  switch (index) {
    case 0:
      return "🥇";
    case 1:
      return "🥈";
    case 2:
      return "🥉";
    default:
      return "";
  }
}
</script>

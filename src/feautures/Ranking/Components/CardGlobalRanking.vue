<template>
  <div class="p-5 bg-white shadow-lg rounded-2xl w-11/12">
    <FwbInput
      list="countries"
      v-model="country"
      type="text"
      :validation-status="countryError ? 'error' : undefined"
      label="Country"
      placeholder="Ej: Costa Rica"
    >
      <template #suffix>
        <span class="pi pi-home"></span>
      </template>
      <template #validationMessage>
        <span class="font-medium">{{ countryError }}</span>
      </template>
    </FwbInput>

    <datalist id="countries">
      <option
        v-for="countryItem in filteredCountries"
        :key="countryItem.code"
        :value="countryItem.name"
      >
        {{ countryItem.name }}
      </option>
    </datalist>
    <h2 class="text-2xl font-bold mb-4 text-center">
      🏆 Top of - {{ country }}
    </h2>

    <div v-if="isLoading" class="space-y-2 animate-pulse">
      <div v-for="n in 4" :key="n" class="h-10 bg-gray-200 rounded-xl"></div>
    </div>

    <div v-else>
      <div
        v-for="rank in ranking"
        :key="rank.userId"
        class="flex justify-between items-center mb-2 p-3 rounded-xl shadow-sm hover:shadow-md transition-shadow bg-gray-50"
      >
        <div class="flex items-center gap-3">
          <span class="text-lg">
            {{ rank.position > 3 ? rank.position : getMedal(rank.position) }}
          </span>
          <span class="font-medium">{{ rank.fullName }}</span>
        </div>
        <div class="text-right">
          <div class="text-sm text-gray-500">
            {{ rank.totalRecords }} quizzes
          </div>
          <div class="font-bold text-blue-600">{{ rank.totalPoints }} pts</div>
        </div>
      </div>

      <p class="text-center text-lg font-bold mb-4">Your current position</p>

      <div
        v-if="userRank"
        :key="userRank.fullName"
        class="flex justify-between items-center mb-2 p-3 rounded-xl shadow-sm hover:shadow-md transition-shadow bg-gray-50"
      >
        <div class="flex items-center gap-3">
          <span class="text-lg">
            {{
              userRank.position > 3
                ? userRank.position
                : getMedal(userRank.position)
            }}
          </span>
          <span class="font-medium">{{ userRank.fullName }}</span>
        </div>
        <div class="text-right">
          <div class="text-sm text-gray-500">
            {{ userRank.totalRecords }} quizzes
          </div>
          <div class="font-bold text-blue-600">
            {{ userRank.totalPoints }} pts
          </div>
        </div>
      </div>

      <div
        v-if="!isLoadingUser && !userRank"
        class="p-3 text-gray-500 text-center"
      >
        You dont have score yet
      </div>

      <div
        v-if="!isLoading && ranking.length === 0"
        class="p-3 text-gray-500 text-center"
      >
        No users to display
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useInfiniteQuery, useQuery } from "@tanstack/vue-query";

import { computed } from "vue";
import { GetRankin, GetRankinUser } from "../Service/Ranking";
import type { Rank } from "../Types/Rank";
import type { PaginatedResponse } from "src/feautures/shared/Interfaces/interfaces";
import { countries } from "@core/CountriesArray";
import { useField } from "vee-validate";
import { FwbInput } from "flowbite-vue";

const MAX_INITIAL = 10;

const filteredCountries = computed(() => {
  if (!country.value) {
    return countries.slice(0, MAX_INITIAL);
  }
  return countries.filter((c) =>
    c.name.toLowerCase().includes(country.value.toLowerCase())
  );
});

const { value: country, errorMessage: countryError } =
  useField<{ country: string }["country"]>("country");

const { data, isLoading } = useInfiniteQuery<PaginatedResponse<Rank>, Error>({
  queryKey: computed(() => ["Global_Rank", country.value]),
  queryFn: async ({ pageParam = 1 }) => {
    const page = pageParam as number;
    return await GetRankin({
      country: country.value,
      page,
      limit: 3,
    });
  },
  initialPageParam: 1,
  getNextPageParam: (lastPage, allPages) => {
    return lastPage.meta?.hasNextPage ? allPages.length + 1 : undefined;
  },
  getPreviousPageParam: (firstPage, allPages) => {
    return firstPage.meta?.hasPrevPage ? allPages.length - 1 : undefined;
  },
});

const ranking = computed(
  () => data.value?.pages.flatMap((page) => page.data).slice(0, 3) ?? []
);

const { data: userData, isLoading: isLoadingUser } = useQuery({
  queryKey: computed(() => ["Global_User_Rank", country.value]),
  queryFn: () => GetRankinUser({ country: country.value }),
});

const userRank = computed(() => {
  return userData.value?.data || null;
});

function getMedal(index: number): string {
  switch (index) {
    case 1:
      return "🥇";
    case 2:
      return "🥈";
    case 3:
      return "🥉";
    default:
      return "";
  }
}
</script>

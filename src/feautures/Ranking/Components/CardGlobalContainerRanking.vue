<template>
  <div class="p-5 bg-white shadow-lg rounded-2xl w-11/12">
    <CountrySearch v-model:country="country" />
    <h2 class="text-2xl font-bold mb-4 text-center">
      🏆 Top of - {{ country }}
    </h2>

    <div v-if="isLoading" class="space-y-2 animate-pulse">
      <div v-for="n in 4" :key="n" class="h-10 bg-gray-200 rounded-xl"></div>
    </div>

    <div v-else>
      <CardRanking
        v-for="rank in ranking"
        :country="country"
        :userName="rank.fullName"
        :position="rank.position"
        :totalRecords="rank.totalRecords"
        :totalPoints="rank.totalPoints"
      />
      <p class="text-center text-lg font-bold mb-4">Your current position</p>
      <CardRanking
        v-if="userRank"
        :country="country"
        :userName="userRank.fullName"
        :position="userRank.position"
        :totalRecords="userRank.totalRecords"
        :totalPoints="userRank.totalPoints"
      />

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
import { useField } from "vee-validate";
import { GetRankin, GetRankinUser } from "../Service/Ranking";
import type { PaginatedResponse } from "src/feautures/shared/Interfaces/interfaces";
import type { Rank } from "../Types/Rank";
import CardRanking from "./CardRanking.vue";
import CountrySearch from "@components/CountrySearch.vue";


const { value: country } =
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
</script>

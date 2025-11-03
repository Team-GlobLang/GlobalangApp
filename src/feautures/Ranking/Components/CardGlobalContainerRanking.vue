<template>
  <div class="p-5 bg-white shadow-lg rounded-2xl w-11/12">
    <div ref="countryBoxRef" class="relative w-full">
      <FwbInput
        v-model="country"
        type="text"
        :validation-status="countryError ? 'error' : undefined"
        label="Country"
        placeholder="Ej: Costa Rica"
        @focus="showList = true"
        @input="showList = true"
        @keydown.esc="showList = false"
      >
        <template #suffix>
          <span class="pi pi-home"></span>
        </template>
        <template #validationMessage>
          <span class="font-medium">{{ countryError }}</span>
        </template>
      </FwbInput>

      <!-- Lista desplegable -->
      <ul
        v-if="showList && filteredCountries.length"
        class="absolute top-full left-0 right-0 z-50 w-full bg-white shadow-md border rounded-md mt-1 max-h-48 overflow-y-auto"
        role="listbox"
      >
        <li
          v-for="c in filteredCountries"
          :key="c.code"
          class="px-3 py-2 cursor-pointer hover:bg-amber-100"
          @mousedown.prevent="selectCountry(c.name)"
          role="option"
        >
          {{ c.name }}
        </li>
      </ul>
    </div>
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
import { computed, onBeforeUnmount, onMounted, ref, watch } from "vue";
import { countries } from "@core/CountriesArray";
import { useField } from "vee-validate";
import { FwbInput } from "flowbite-vue";
import { GetRankin, GetRankinUser } from "../Service/Ranking";
import type { PaginatedResponse } from "src/feautures/shared/Interfaces/interfaces";
import type { Rank } from "../Types/Rank";
import CardRanking from "./CardRanking.vue";

const MAX_INITIAL = 5;

const showList = ref(false);
const countryBoxRef = ref<HTMLElement | null>(null);

const norm = (s: string) =>
  (s || "")
    .toLocaleLowerCase()
    .normalize("NFD")
    .replace(/\p{Diacritic}/gu, "");

const filteredCountries = computed(() => {
  const q = norm(country.value || "");
  const list = q
    ? countries.filter(c => norm(c.name).includes(q))
    : countries;
  return list.slice(0, MAX_INITIAL);
});

function selectCountry(name: string) {
  country.value = name;
  showList.value = false;
}

const { value: country, errorMessage: countryError } =
  useField<{ country: string }["country"]>("country");

watch(country, (val) => {
  if (!val?.trim()) showList.value = false;
});

function handlePointerDown(e: PointerEvent) {
  const root = countryBoxRef.value;
  if (!root) return;
  if (!root.contains(e.target as Node)) showList.value = false;
}
onMounted(() => {
  window.addEventListener("pointerdown", handlePointerDown, { passive: true });
});
onBeforeUnmount(() => {
  window.removeEventListener("pointerdown", handlePointerDown);
});

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

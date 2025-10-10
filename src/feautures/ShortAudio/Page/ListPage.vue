<template>
  <main class="w-full flex flex-col gap-2 justify-center items-center pt-3">
    <div class="w-full p-2">
      <BreadCrumb :items="breadcrumbItems" />
    </div>

    <div class="w-11/12 bg-white shadow-lg rounded-xl p-6">
      <FilterAudio v-model:country="country" @filterchange="onFilter" />

      <div class="flex items-center justify-between mt-2">
        <h2 class="text-xl font-bold">List Short</h2>
        <FavoriteButton
          v-if="selectedIds.length > 0"
          :selectedIds="selectedIds"
          @done="selectedIds = []"
        />
      </div>

      <div class="py-2">
        <ListAudiosCard
          :country="country"
          :pageSize="24"
          v-model:selectedIds="selectedIds"
        />
      </div>
    </div>
    <ScrollTopButton />
  </main>
</template>

<script setup lang="ts">
import { ref } from "vue";
import ListAudiosCard from "../Components/Card/ListAudiosCard.vue";
import FavoriteButton from "../Components/Button/FavoriteButton.vue";
import FilterAudio from "../Components/FilterAudio.vue";
import BreadCrumb from "@layouts/BreadCrumb.vue";
import ScrollTopButton from "../Components/Button/ScrollTopButton.vue";

const country = ref<string>("");

function onFilter(val: string) {
  country.value = val;
}

const selectedIds = ref<string[]>([]);

const breadcrumbItems = [
  { label: "Home", route: "/home", isHome: true },
  { label: "Shorts Studio", route: "/studio/short" },
  { label: "Available Shorts" },
];
</script>

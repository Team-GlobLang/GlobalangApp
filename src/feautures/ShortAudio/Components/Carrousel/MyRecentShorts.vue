<template>
  <div>
    <Carousel
      v-if="!isLoading"
      :value="shorts"
      :numVisible="1"
      :numScroll="1"
      :responsiveOptions="responsiveOptions"
      :circular="true"
      :showNavigators="false"
      :autoplayInterval="6200"
    >
      <template #item="slotProps">
        <MyShortsCard
          :id="slotProps.data.id"
          :text="slotProps.data.text"
          :fileUrl="slotProps.data.fileUrl"
          :country="slotProps.data.country"
          :createBy="slotProps.data.createBy"
          :description="slotProps.data.description"
          :approved="slotProps.data.approved"
          :reviewComment="slotProps.data.reviewComment"
        />
      </template>
    </Carousel>

    <div v-else class="grid grid-cols-1 gap-4">
      <div
        v-for="n in 1"
        :key="n"
        class="animate-pulse shadow bg-gray-200 rounded-2xl p-4 h-52"
      ></div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from "vue";
import { useQuery } from "@tanstack/vue-query";
import Carousel from "primevue/carousel";
import MyShortsCard from "../Card/MyShortsCard.vue";
import { getMyShorts } from "../../Services/shortService";
import type { ShortsListResponse } from "../../Interfaces/Shorts.interface";

const responsiveOptions = [
  { breakpoint: "1400px", numVisible: 1, numScroll: 1 },
  { breakpoint: "1199px", numVisible: 1, numScroll: 1 },
  { breakpoint: "767px", numVisible: 1, numScroll: 1 },
  { breakpoint: "575px", numVisible: 1, numScroll: 1 },
];

const { data, isLoading } = useQuery<ShortsListResponse, Error>({
  queryKey: ["shorts"],
  queryFn: async () => await getMyShorts({ page: 1, limit: 6 }),
  staleTime: 1000 * 60 * 5,
});

const shorts = computed(() => data.value?.data ?? []);
</script>

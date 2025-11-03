<template>
  <div class="w-full relative">
    <Carousel
      :value="props.data"
      :numVisible="3"
      :numScroll="1"
      :circular="true"
      :responsiveOptions="responsiveOptions"
      class="w-full"
      :show-navigators="false"
      :autoplay-interval="4000"
      
    >
      <template #item="slotProps">
        <ShortCard
          :id="slotProps.data.id"
          :country="slotProps.data.country"
          :text="slotProps.data.text"
          :description="slotProps.data.description"
          :file-url="slotProps.data.fileUrl"
        />
      </template>
    </Carousel>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import Carousel from "primevue/carousel";
import ShortCard from "./ShortCard.vue";
import type { ShortInterface } from "../../Interfaces/short-interface";

const props = defineProps<{
  data: ShortInterface[];
}>();

const responsiveOptions = ref([
  {
    breakpoint: "1900px",
    numVisible: 1,
    numScroll: 1,
  },
  {
    breakpoint: "1024px",
    numVisible: 1,
    numScroll: 1,
  },
  {
    breakpoint: "768px",
    numVisible: 1,
    numScroll: 1,
  },
]);
</script>

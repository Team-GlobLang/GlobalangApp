<template>
  <fwb-card class="w-full p-2 items-center">
    <div class="bg-white rounded-lg p-4 flex flex-col gap-2">
      <h2 class="text-2xl font-bold">{{ props.user }}</h2>
      <span class="flex flex-col font-light text-lg gap-0.5">
        <small>Titulos: {{ props.title }}</small>
        <small>idioma: {{ props.language }}</small>
        <small>categoría: {{ props.category }}</small>
        <small>Aporbado por: {{ props.aprobeBy }}</small>
      </span>
      <fwb-button color="light" class="border-[#FF0000] text-lg">
        <i class="pi pi-trash text-[#FF0000]"></i>
        Retirar como {{ props.category }}</fwb-button
      >
    </div>
  </fwb-card>
</template>

<script setup lang="ts">
import { FwbButton } from "flowbite-vue";

const props = defineProps({
  user: {
    type: String,
  },
  title: {
    type: String,
  },
  language: {
    type: String,
  },
  category: {
    type: String,
  },
  aprobeBy: {
    type: String,
  },
});
</script>

<style scoped></style>

<template>
  <fwb-card class="w-full p-2 items-center">
    <div class="bg-white rounded-lg p-4 flex flex-col gap-2">
      <h2 class="text-lg font-bold">Creado por: {{ props.user }}</h2>
      <span class="flex flex-col font-light">
        <small>Titulo: {{ props.title }}</small>
        <small>Cantidad de preguntas: {{ props.questionsNUmber }}</small>
        <small>Idioma: {{ props.language }}</small>
      </span>
      <btn_-group
        accept-icon="pi-cloud-upload"
        accept-text="Empezar revision"
        reject-icon="pi-trash"
        reject-text="Rechazar"
      />
    </div>
  </fwb-card>
</template>

<script setup lang="ts">
import Btn_Group from "./Btn_Group.vue";
const props = defineProps({
  user: {
    type: String,
  },
  title: {
    type: String,
  },
  questionsNUmber: {
    type: Number,
  },
  language: {
    type: String,
  },
});
</script>

<style scoped></style>

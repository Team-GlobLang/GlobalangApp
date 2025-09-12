<template>
  <fwb-card class="w-full p-2 items-center">
    <div class="bg-white rounded-lg p-4 flex justify-center gap-12">
      <i class="pi pi-play-circle" style="font-size: 3rem"></i>
      <div class="flex flex-col gap-4">
        <h2 class="text-xl font-bold">{{ props.phrase }}</h2>
        <span class="flex flex-col font-light text-lg gap-2">
          <small>Significado: {{ props.meaning }} </small>
          <small>Creado por: {{ props.name }} </small>
          <small>Aporbado por: {{ props.name }} </small>
        </span>

        <btn_-group
          accept-icon="pi-cloud-upload"
          accept-text="Aprobar"
          reject-icon="pi-trash"
          reject-text="Rechazar"
        />
      </div>
    </div>
  </fwb-card>
</template>

<script setup lang="ts">
import Btn_Group from "./Btn_Group.vue";

const props = defineProps({
  name: {
    type: String,
  },
  phrase: {
    type: String,
  },
  meaning: {
    type: String,
  },
  admin: {
    type: String,
  },
});
</script>

<style scoped></style>

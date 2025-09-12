<template>
  <Lyout>
    <section
      class="justify-center flex flex-col bg-[#F6F6F6] p-2 rounded-lg gap-4"
    >
      <fwb-select
        v-model="selected"
        :options="language"
        label="Selecciona un idioma"
      />
      <fwb-select v-model="selected" :options="status" label="Estado" />
      <Teacher_Colaborator_Card
        user="Keirin Obando Duarte"
        category="Profesor"
        aprobe-by="Adrian Aguilar Diaz"
        title="Interprete, Comercio"
        language="Mandarin"
      />
    </section>
  </Lyout>
</template>

<script setup lang="ts">
import Lyout from "../../../lyouts/Lyout.vue";
import { FwbSelect } from "flowbite-vue";
import { ref } from "vue";
import Teacher_Colaborator_Card from "../components/Teacher_Colaborator_Card.vue";

const selected = ref("");
const language = [
  { value: "pp", name: "Prueba premium" },
  { value: "pm", name: "Pro max" },
  { value: "es", name: "estandar" },
];

const status = [
  { value: "act", name: "Activa" },
  { value: "ina", name: "Inactivo" },
];
</script>

<style scoped></style>

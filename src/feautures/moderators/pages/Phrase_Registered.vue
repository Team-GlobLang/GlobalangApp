<template>
  <Lyout>
    <section
      class="justify-center flex flex-col bg-[#F6F6F6] p-2 rounded-lg gap-4"
    >
      <fwb-select
        v-model="selected"
        :options="countries"
        label="Selecciona un idioma"
      />
      <fwb-select v-model="selected" :options="status" label="Estado" />

      <Phrases_Registered_Card
        admin="Adrian Aguilar Diaz"
        meaning="Hola, amigo"
        name="Keirin Obando Duarte"
        phrase="Que mop"
      />
    </section>
  </Lyout>
</template>

<script setup lang="ts">
import Lyout from "../../../lyouts/Lyout.vue";
import Phrases_Registered_Card from "../components/Phrases_Registered_Card.vue";
import { ref } from "vue";
import { FwbSelect } from "flowbite-vue";

const selected = ref("");
const countries = [
  { value: "us", name: "United States" },
  { value: "ca", name: "Canada" },
  { value: "fr", name: "France" },
];

const status = [
  { value: "act", name: "Activa" },
  { value: "ina", name: "Inactivo" },
];
</script>

<style scoped></style>

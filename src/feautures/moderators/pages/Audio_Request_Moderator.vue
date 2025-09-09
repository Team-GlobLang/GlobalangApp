<template>
  <Lyout>
    <section class="justify-center bg-[#F6F6F6] p-2 rounded-lg">
      <fwb-select
        v-model="selected"
        :options="countries"
        label="Selecciona un idioma"
      />
      <Request_Audio_Card
        name="Akion Cheng Jimenez"
        meaning="Que tal todo?"
        phrase="Todo Nais Firulais"
      />
    </section>
  </Lyout>
</template>

<script setup lang="ts">
import Lyout from "../../../lyouts/Lyout.vue";
import Request_Audio_Card from "../components/Request_Audio._Card.vue";
import { ref } from "vue";
import { FwbSelect } from "flowbite-vue";

const selected = ref("");
const countries = [
  { value: "us", name: "United States" },
  { value: "ca", name: "Canada" },
  { value: "fr", name: "France" },
];
</script>

<style scoped></style>

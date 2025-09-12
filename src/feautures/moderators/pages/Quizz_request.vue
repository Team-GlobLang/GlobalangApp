<template>
  <Lyout>
    <section class="justify-center bg-[#F6F6F6] p-2 rounded-lg">
      <fwb-select
        v-model="selected"
        :options="countries"
        label="Selecciona un idioma"
      />
      <!-- Cambiar por v for cuando haga logica con db -->
      <!-- Ajustar fondo para que abarque full el height sin importar el contenido-->
      <Quiz_Card
        user="Akion Cheng jimenez"
        title="Español basico"
        language="Tico"
        :questionsNUmber="2"
      />

      <Request_Quiz_Card
        user="Keirin Obando Duarte"
        title="Ingles avanzado"
        language="Newyorkino"
        :questionsNUmber="10"
      />
    </section>
  </Lyout>
</template>

<script setup lang="ts">
import Lyout from "../../../lyouts/Lyout.vue";
import Request_Quiz_Card from "../components/Request_Quiz_Card.vue";
import { ref } from "vue";
import { FwbSelect } from "flowbite-vue";

const selected = ref("");
const countries = [
  { value: "us", name: "United States" },
  { value: "ca", name: "Canada" },
  { value: "fr", name: "France" },
];
</script>

<style lang="scss" scoped></style>

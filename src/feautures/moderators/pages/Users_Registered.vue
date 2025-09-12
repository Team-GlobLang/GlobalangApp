<template>
  <Lyout>
    <section
      class="justify-center flex flex-col bg-[#F6F6F6] p-2 rounded-lg gap-4"
    >
      <div class="flex justify-end">
        <fwb-button color="green">Crear moderador</fwb-button>
      </div>
      <fwb-select
        v-model="selected"
        :options="plan"
        label="Selecciona un idioma"
      />
      <fwb-select v-model="selected" :options="email" label="Correo" />
      <Users_Registered_Card
        user="Akion Cheng Jimenez"
        :age="22"
        email="achengjimenez@gmail.com"
        suscripcion="Prueba gratuita"
        end_date="20/9/2026"
      />
    </section>
  </Lyout>
</template>

<script setup lang="ts">
import Lyout from "../../../lyouts/Lyout.vue";
import Users_Registered_Card from "../components/Users_Registered_Card.vue";
import { ref } from "vue";
import { FwbSelect } from "flowbite-vue";
import { FwbButton } from "flowbite-vue";

const selected = ref("");
const plan = [
  { value: "pp", name: "Prueba premium" },
  { value: "pm", name: "Pro max" },
  { value: "es", name: "estandar" },
];

const email = [
  { value: "act", name: "Activa" },
  { value: "ina", name: "Inactivo" },
];
</script>

<style scoped></style>

<template>
  <Lyout>
    <section
      class="flex flex-col gap-6 justify-center items-center bg-[#F6F6F6] p-4 rounded-lg text-sm"
    >
      <Colaborator_Request_View_Card
        name="Akion Cheng Jimenez"
        email="achengjimenezprimaria@gmail.com"
        message="Un texto cualquiera"
        -languages="español españa"
        title="Enseñanza del ingles UNA"
      />
    </section>
  </Lyout>
</template>

<script setup lang="ts">
import Lyout from "../../../lyouts/Lyout.vue";
import Colaborator_Request_View_Card from "../components/Colaborator_Request_View_Card.vue";
</script>

<style scoped></style>

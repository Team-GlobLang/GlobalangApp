<template>
  <Lyout>
    <section class="flex flex-col items-center w-full gap-8">
      <home_-user_-card
        name="Adrian Aguilar"
        role="Moderador de sistema"
        notifyNumber="2"
      />
      <home_-options_-request
        title="solicitudes de quiz"
        description="Revisa y
    aprueba quizzes enviados por profesores para hacerlos de vista publica."
        requestNumber="2"
        icon="pi-list"
        bgColor="bg-[#CCFFE7]"
      />

      <home_-options_-request
        title="solicitudes de frases"
        description="Gestiona solicitudes de nuevas grases y expresiones."
        requestNumber="2"
        icon="pi-microphone"
        bgColor="bg-[#FFD5FE]"
      />

      <home_-options_-request
        title="solicitudes de colaboradores"
        description="Aprobar nuevos profesores y colaboradores."
        requestNumber="2"
        icon="pi-users"
        bgColor="bg-[#FFDADA]"
      />
      <home_-stadistics_-card />
    </section>
  </Lyout>
</template>

<script setup lang="ts">
import Home_User_Card from "../components/Home_User_Card.vue";
import Home_Options_Request from "../components/Home_Options_Request.vue";
import Lyout from "../../../lyouts/Lyout.vue";
import Home_Stadistics_Card from "../components/Home_Stadistics_Card.vue";
</script>

<style lang="css" scoped></style>

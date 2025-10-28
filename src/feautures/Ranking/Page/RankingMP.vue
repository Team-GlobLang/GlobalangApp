<template>
  <BreadCrumb :items="breadCrumbItems" />
  <div
    class="flex flex-col w-full items-center justify-center gap-6 h-[80dvh] px-4"
  >
    <router-link :to="{ name: 'LocalRanking' }" class="w-full">
      <OptionCardMd
        title="Local ranking"
        description="Compete with nearby learners and climb the local leaderboard to master the language like a native!"
        icon="pi-trophy"
        color="bg-blue-100"
      />
    </router-link>

    <router-link :to="{ name: 'GlobalRanking' }" class="w-full">
      <OptionCardMd
        title="Global ranking"
        description="Go global! Challenge learners from around the world and climb the global leaderboard to prove your fluency."
        icon="pi-globe"
        color="bg-green-100"
      />
    </router-link>
  </div>
</template>

<script setup lang="ts">
import OptionCardMd from "../Components/OptionCardMd.vue";
import BreadCrumb from "@layouts/BreadCrumb.vue";

const breadCrumbItems = [
  {
    label: "Home",
    route: "Home",
    isHome: true,
  },
  {
    label: "Ranking",
  },
];
</script>

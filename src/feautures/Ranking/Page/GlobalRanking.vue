<template>
  <div class="w-full flex flex-col items-center justify-center gap-2">
    <div class="w-full pt-2 pl-2">
      <BreadCrumb :items="breadcrumbItems" />
    </div>

    <CardGlobalRanking />
  </div>
</template>
<script setup lang="ts">
import BreadCrumb from "@layouts/BreadCrumb.vue";
import CardGlobalRanking from "../Components/CardGlobalRanking.vue";

const breadcrumbItems = [
  { label: "Home", route: "/home", isHome: true },
  { label: "Ranking", route: "/Ranking" },
  { label: "Global" },
];
</script>

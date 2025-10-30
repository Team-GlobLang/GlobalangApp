<template>
  <div class="w-full flex flex-col items-center justify-center gap-6">
    <div class="w-full pt-2 pl-2">
      <BreadCrumb :items="breadcrumbItems" />
    </div>
    <CardLocalContainerRanking />
    <CardGlobalContainerRanking />
  </div>
</template>
<script setup lang="ts">
import BreadCrumb from "@layouts/BreadCrumb.vue";
import CardLocalContainerRanking from "../Components/CardLocalContainerRanking.vue";
import CardGlobalContainerRanking from "../Components/CardGlobalContainerRanking.vue";

const breadcrumbItems = [
  { label: "Home", route: "/home", isHome: true },
  { label: "Ranking" },
];
</script>

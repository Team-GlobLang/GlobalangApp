<template>
  <div class="w-full flex flex-col items-center justify-center gap-2">
    <div class=" w-full pt-2 pl-2">
      <BreadCrumb :items="breadcrumbItems" />
    </div>
    <CardUserInfo />

    <CardUserStats />

    <div class=" w-11/12 flex">
      <LogOutBtn/>
    </div>
    
  </div>
</template>
<script setup lang="ts">
import BreadCrumb from "@layouts/BreadCrumb.vue";
import CardUserInfo from "../Components/CardUserInfo.vue";
import CardUserStats from "../Components/CardUserStats.vue";
import LogOutBtn from "../Components/LogOutBtn.vue";


const breadcrumbItems = [
  { label: "Home", route: "/home", isHome: true },
  { label: "User", route: "/user" },
];

</script>

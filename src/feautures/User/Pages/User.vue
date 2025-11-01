<template>
  <div class="w-full flex flex-col items-center justify-center gap-2">
    <div class=" w-full pt-2 pl-2">
      <BreadCrumb :items="breadcrumbItems" />
    </div>
    <CardUserInfo />

    <CardUserStats />

    <CardEditProfile/>
    
    <CardUpgrateToPremiun v-if="!isPremium"/>

    <LogOutBtn/>

    
  </div>
</template>
<script setup lang="ts">
import BreadCrumb from "@layouts/BreadCrumb.vue";
import CardUserInfo from "../Components/CardUserInfo.vue";
import CardUserStats from "../Components/CardUserStats.vue";
import LogOutBtn from "../Components/LogOutBtn.vue";
import CardEditProfile from "../Components/CardEditProfile.vue";
import CardUpgrateToPremiun from "../Components/CardUpgrateToPremiun.vue";
import { userStore } from "@UserStore";
import { computed } from "vue";


const breadcrumbItems = [
  { label: "Home", route: "/home", isHome: true },
  { label: "User", route: "/user" },
];

const store = userStore;
const user = store.user;

const isPremium = computed(() => {
  return user?.membership === "PREMIUM";
});

</script>

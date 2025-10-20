<template>
  <FwbButton color="red" class="w-full" :onclick="logOut"> Log Out </FwbButton>
</template>

<script setup lang="ts">
import { userStore } from "@UserStore";
import { FwbButton } from "flowbite-vue";
import { useRouter } from "vue-router";
const router = useRouter()
const logOut = () => {
  userStore.logout();
  router.replace({name:'start'})
};
</script>

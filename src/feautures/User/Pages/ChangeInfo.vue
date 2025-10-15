<template>
  <div class="flex flex-col gap-4 justify-center w-full items-center">
    <div class="w-full pt-4 pl-2">
      <BreadCrumb :items="breadcrumbItems" />
    </div>
    <FormChangeInfo />
    <FormChangePassword />
  </div>
</template>
<script setup lang="ts">
import BreadCrumb from "@layouts/BreadCrumb.vue";
import FormChangeInfo from "../Components/FormChangeInfo.vue";
import FormChangePassword from "../Components/FormChangePassword.vue";

const breadcrumbItems = [
  { label: "Home", route: "/home", isHome: true },
  { label: "User", route: "/user" },
  { label: "Edit Info", route: "/user/edit-info" },
];
</script>

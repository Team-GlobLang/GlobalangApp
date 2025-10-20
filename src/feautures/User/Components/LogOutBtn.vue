<template>
  <div
    class=" w-11/12 p-4 bg-red-50 border border-red-200 rounded-2xl shadow hover:shadow-lg transition flex flex-col justify-between"
  >
    <div>
      <h3 class="text-lg font-semibold text-red-700">Log Out</h3>
      <p class="text-sm text-red-600 mt-2">
        End your session securely and return to the start screen.
      </p>
    </div>
    <FwbButton
      color="red"
      class="mt-4 w-full font-medium hover:bg-red-700"
      :onclick="logOut"
    >
      Log Out <i class="pl-3 pi pi-sign-out"></i>
    </FwbButton>
  </div>
</template>

<script setup lang="ts">
import { FwbButton } from "flowbite-vue";
import { userStore } from "@UserStore";
import { useRouter } from "vue-router";

const router = useRouter();

const logOut = () => {
  userStore.logout();
  router.replace({ name: "start" });
};
</script>

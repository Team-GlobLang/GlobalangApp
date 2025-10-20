<template>
  <div
    @click="goto"
    class="w-11/12 p-4 bg-white border border-gray-200 rounded-2xl shadow hover:shadow-lg transition"
  >
    <div class="flex flex-col justify-between h-full">
      <div>
        <h3 class="text-lg font-semibold text-gray-800">Edit Profile</h3>
        <p class="text-sm text-gray-600 mt-2">
          Update your personal details or password.
        </p>
      </div>
      <FwbButton
        color="light"
        class="mt-4 w-full font-medium hover:bg-gray-100"
      >
        Edit Profile
      </FwbButton>
    </div>
  </div>
</template>

<script setup lang="ts">
import { FwbButton } from "flowbite-vue";
import { useRouter } from "vue-router";

const router = useRouter();
function goto() {
  router.push({ name: "EditUserInfo" });
}
</script>

<template>
  <div v-if="user" class="bg-white shadow-2xl rounded-2xl p-6 w-11/12">
    <div class="flex items-center space-x-4 mb-2">
      <div
        class="h-14 w-14 bg-blue-100 text-blue-600 flex items-center justify-center rounded-full text-xl font-semibold"
      >
        {{ initials }}
      </div>
      <div class="flex items-center gap-4">
        <div>
          <h2 class="text-lg font-bold text-gray-800">{{ user.fullName }}</h2>
          <p class="text-sm text-gray-500">{{ user.email }}</p>
        </div>
      </div>
    </div>

    <div class="space-y-2 text-sm text-gray-700">
      <div class="flex justify-between">
        <span class="font-medium text-gray-500">Country:</span>
        <span>{{ user.country }}</span>
      </div>

      <div class="flex justify-between">
        <span class="font-medium text-gray-500">Birth date:</span>
        <span>{{ formattedDate }}</span>
      </div>

      <div class="flex justify-between">
        <span class="font-medium text-gray-500">Membership:</span>
        <span class="capitalize">{{ user.membership }}</span>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { userStore } from "@UserStore";
import { computed } from "vue";

const user = computed(() => userStore.user);

const initials = computed(() =>
  user.value?.fullName
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
);

const formattedDate = computed(() => {
  const date = user.value?.birthDate;
  return date ? new Date(date).toLocaleDateString() : "—";
});


</script>

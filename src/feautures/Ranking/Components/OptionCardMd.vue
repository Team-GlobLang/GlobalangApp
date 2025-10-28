<template>
  <div class="w-full">
    <div
      :class="`p-5 flex flex-col items-center justify-center gap-6 w-full ${props.color} rounded-xl p-4`"
    >
      <i :class="`pi ${props.icon}`" style="font-size: 3rem"></i>
      <div class="flex flex-col items-center">
        <h5 class="mb-2 text-2xl font-bold tracking-black">
          {{ props.title }}
        </h5>
        <p class="font-normal text-center text-gray-700 dark:text-gray-400">
          {{ props.description }}
        </p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const props = defineProps({
  title: {
    type: String,
  },
  description: {
    type: String,
  },
  color: {
    type: String,
  },
  icon: {
    type: String,
  },
});
</script>

<style scoped></style>

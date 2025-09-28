<template>
  <div class="w-full min-h-screen flex items-center justify-center bg-gradient-to-b from-blue-50 to-white">
    <div
      class="flex flex-col items-center justify-center w-full max-w-md px-6 py-10 gap-8 bg-white rounded-xl shadow-lg">
      <img src="/Glob.png" alt="globIcon" class="h-24 w-auto mb-2" />
      <h1 class="text-2xl font-bold text-blue-700 text-center">Welcome to Globalang</h1>
      <p class="text-gray-600 text-center">Connect with the world, one word at a time</p>
      <RouterLink to="/login" class="w-full flex justify-center">
        <FwbButton class="w-full md:w-2/3 py-2 text-lg">Start</FwbButton>
      </RouterLink>
      <RouterLink to="/register" class="text-blue-600 text-sm text-center hover:underline w-full mt-2">Don't have an
        account? Sign up</RouterLink>
    </div>
  </div>
</template>
<script lang="ts" setup>
import { FwbButton } from 'flowbite-vue';

</script>
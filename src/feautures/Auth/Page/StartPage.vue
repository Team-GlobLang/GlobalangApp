<template>
  <div class=" w-full flex items-center justify-center h-screen">
    <div class=" flex justify-center flex-col w-4/5  gap-10">
      <img src="/Glob.png" alt="globIcon" class=" h-50" />
      <p class=" self-center">Connect with the world, one word at a time</p>
      <RouterLink to="/login" class=" self-center">
        <FwbButton>
          Start
        </FwbButton>
      </RouterLink>
      <RouterLink to="/register" class="text-blue-600 self-end">Don't have an account?</RouterLink>
    </div>
  </div>
</template>
<script lang="ts" setup>
import { FwbButton } from 'flowbite-vue';

</script>
<template>
  <RouterLink
    :to="{ name: 'AudioRecorderPage' }"
    class="block rounded-2xl bg-blue-50 hover:bg-blue-100 transition p-6 text-center shadow-sm"
  >
    <span class="text-4xl mb-4">✏️</span>
    <h3 class="text-xl font-semibold">Create Short</h3>
    <p class="text-gray-600 mt-2">Record a new short audio from scratch.</p>
  </RouterLink>
</template>

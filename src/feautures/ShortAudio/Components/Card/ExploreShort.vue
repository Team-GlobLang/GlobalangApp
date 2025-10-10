<template>
  <RouterLink
    :to="{ name: 'shorts-list' }"
    class="block rounded-2xl bg-purple-50 hover:bg-purple-100 transition p-6 text-center shadow-sm"
  >
    <span class="text-4xl mb-4">🌐</span>
    <h3 class="text-xl font-semibold">Explore Short</h3>
    <p class="text-gray-600 mt-2">Discover public short audios from other users.</p>
  </RouterLink>
</template>

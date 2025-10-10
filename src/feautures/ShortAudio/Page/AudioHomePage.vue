<template>
  <main class="w-full p-4 md:p-6">
    <div class="w-full mb-2">
      <BreadCrumb :items="breadcrumbItems" />
    </div>

    <section class="max-w-3xl mx-auto">
      <h1 class="text-3xl md:text-4xl font-extrabold text-gray-900">Short Studio</h1>
      <p class="text-gray-600 mt-2">
        Welcome to your short-audio control center. Create or explore audios easily.
      </p>

      <div class="mt-6 grid gap-4">
        <CreateShort />
        <ExploreShort />
      </div>
    </section>
  </main>
</template>

<script setup lang="ts">
import CreateShort from '../Components/Card/CreateShort.vue';
import ExploreShort from '../Components/Card/ExploreShort.vue';
import BreadCrumb from '@layouts/BreadCrumb.vue'

const breadcrumbItems = [
  { label: "Home", route: "/home", isHome: true },
  { label: 'Audio Studio', route: '/short/audio' },
];
</script>

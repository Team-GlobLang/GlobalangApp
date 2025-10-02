<template>
  <section class="min-h-screen bg-gray-50">
    <div class="w-full max-w-md mx-auto p-4 md:p-6 space-y-4">
      <BackButton>Audio for review</BackButton>

      <div class="bg-white rounded-2xl shadow p-6">
        <ListenCard
              :src="audioSrc"
              :duration="60"
              :title="audioTitle"
              :description="audioDescription"
              :showReset="true"
              :layout="'split'"
              :maxWidthClass="'max-w-none'"
              :borderClass="'border-blue-200'"
            />
      </div>

    </div>
  </section>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import BackButton from '../Components/Button/BackButton.vue'
import ListenCard from '../Components/ListenCard.vue'

const route = useRoute()
const querySrc = (route.query.src as string) || ''
const paramSrc = (route.params.src as string) || ''
const fallback = '/audios/ejemplo.mp3'
const audioSrc = computed(() => querySrc || paramSrc || fallback)

const audioTitle = computed(() => (route.query.title as string) || 'Sample audio')
const audioDescription = computed(
  () =>
    (route.query.description as string) ||
    'This is a sample description for the selected audio'
)
</script>

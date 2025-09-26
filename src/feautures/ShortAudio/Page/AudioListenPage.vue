<template>
  <section class="min-h-screen bg-gray-50">
    <div class="w-full max-w-md mx-auto p-4 md:p-6 space-y-4">
      <BackButton>Audio para revisión</BackButton>

      <div class="bg-white rounded-2xl shadow p-6">
        <div class="grid grid-cols-1 md:grid-cols-3 gap-6 items-stretch">
          <div class="md:col-span-2">
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

          <!-- boton para cambia despues -->
          <div class="flex items-start justify-center md:justify-start">
            <button
              class="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg shadow transition active:scale-95"
              title="Revisado"
            >
              Revisado
            </button>
          </div>
        </div>
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

const audioTitle = computed(() => (route.query.title as string) || 'Me regala')
const audioDescription = computed(
  () =>
    (route.query.description as string) ||
    'Costarriqueñismo utilizado para decir amablemente que le vendan algo.'
)
</script>

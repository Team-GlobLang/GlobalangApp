<template>
  <button
    type="button"
    @click="handleClick"
    class="inline-flex items-center gap-2 text-gray-700 hover:text-blue-600 font-medium
           focus:outline-none focus:ring-2 focus:ring-blue-300 rounded-lg px-1 py-0.5 group"
    :aria-label="ariaLabel"
  >
    <i v-if="showIcon" class="pi pi-arrow-left transition-transform group-hover:-translate-x-0.5"></i>
    <span><slot>{{ label }}</slot></span>
  </button>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router'

const { label, fallback, showIcon, ariaLabel } = withDefaults(
  defineProps<{
    label?: string
    fallback?: string | { name?: string; path?: string }
    showIcon?: boolean
    ariaLabel?: string
  }>(),
  { label: 'Crear nueva frase', fallback: 'Home', showIcon: true, ariaLabel: 'Volver a la página anterior' }
)

const router = useRouter()

function handleClick() {
  if (typeof window !== 'undefined' && window.history.length > 1) {
    router.back()
  } else {
    if (typeof fallback === 'string') router.push({ name: fallback })
    else router.push(fallback ?? { name: 'Home' })
  }
}
</script>

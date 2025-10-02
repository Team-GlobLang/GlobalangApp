<template>
  <button
    type="button"
    @click="goBack"
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

const {
  label,
  showIcon = true,
  ariaLabel = 'Go back'
} = defineProps<{
  label?: string
  showIcon?: boolean
  ariaLabel?: string
}>()

const router = useRouter()

function goBack() {
  router.back()
}
</script>

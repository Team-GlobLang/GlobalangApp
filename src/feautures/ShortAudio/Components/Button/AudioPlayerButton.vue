<template>
  <button
    class="rounded-full w-20 h-20 flex items-center justify-center shadow transition active:scale-95
           bg-blue-500 hover:bg-blue-600 text-white"
    @click="$emit('toggle')"
    :aria-pressed="isPlaying"
    :title="isPlaying ? 'Pause' : 'Play'"
  >
    <i class="pi text-3xl" :class="isPlaying ? 'pi-pause' : 'pi-volume-up'"></i>
  </button>
</template>

<script setup lang="ts">
defineProps<{
  isPlaying: boolean
}>()

defineEmits<{
  (e: 'toggle'): void
}>()
</script>

<template>
  <div class="flex items-center gap-3">
    <button
      type="button"
      class="w-16 h-16 flex items-center justify-center rounded-full bg-blue-500 text-white shadow-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-300 disabled:opacity-50 disabled:cursor-not-allowed"
      @click="togglePlay"
      :disabled="!src"
      aria-label="Play/Pause"
    >
      <span class="w-6 h-6">
        <component :is="isPlaying ? PauseIcon : SpeakerIcon" class="w-6 h-6 text-white" />
      </span>
    </button>

    <button
      v-if="showReset"
      type="button"
      class="px-3 py-2 rounded-lg bg-gray-100 text-gray-700 hover:bg-gray-200 disabled:opacity-60 disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-gray-300"
      :disabled="isPending"
      @click="reset"
      title="Reiniciar grabación"
      aria-label="Reset"
    >
      <span v-if="isPending">Limpiando…</span>
      <span v-else>Reset</span>
    </button>

    <audio ref="audioRef" :src="src" @ended="onEnded" @pause="onPause" @play="onPlay" />
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useResetRecording } from '../Hooks/Recorder/useResetRecording'

const { src, showReset } = withDefaults(defineProps<{
  src: string
  showReset?: boolean
}>(), { showReset: false })

const audioRef = ref<HTMLAudioElement | null>(null)
const isPlaying = ref(false)

const { reset, isPending } = useResetRecording()

async function togglePlay() {
  if (!audioRef.value) return
  try {
    if (isPlaying.value) {
      audioRef.value.pause()
      isPlaying.value = false
    } else {
      if (audioRef.value.readyState < 2) audioRef.value.load()
      await audioRef.value.play()
      isPlaying.value = true
    }
  } catch (err) {
    console.error('No se pudo reproducir:', err)
    isPlaying.value = false
  }
}

function onEnded() { isPlaying.value = false }
function onPause() { isPlaying.value = false }
function onPlay()  { isPlaying.value = true  }


const SpeakerIcon = {
  template: `
    <svg viewBox="0 0 24 24" fill="none" class="w-full h-full">
      <path d="M4 10v4h3l5 4V6L7 10H4z" fill="currentColor"/>
      <path d="M16 8a4 4 0 010 8" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
      <path d="M18.5 5.5a7 7 0 010 13" stroke="currentColor" stroke-width="2" stroke-linecap="round" opacity=".8"/>
    </svg>`
}
const PauseIcon = {
  template: `
    <svg viewBox="0 0 24 24" fill="none" class="w-full h-full">
      <rect x="6.5" y="5" width="3" height="14" rx="1.2" fill="currentColor"/>
      <rect x="14.5" y="5" width="3" height="14" rx="1.2" fill="currentColor"/>
    </svg>`
}
</script>

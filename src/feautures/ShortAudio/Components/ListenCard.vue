<template>
  <div
    :class="[
      'relative w-full rounded-2xl border border-blue-400 bg-gray-50 shadow p-6 mx-auto',
      maxWidthClass,
      minHeightClass
    ]"
  >
    <div class="flex items-center justify-between mb-4">
      <div class="text-gray-800 font-semibold">
        {{ title }}
      </div>
    </div>
    <p v-if="description" class="mt-1 text-sm text-gray-600 desc-clamp ">
          {{ description }}
    </p>

    <div class="text-center font-semibold mb-1 p-1" v-show="localPlaying">
      Reproduciendo...
    </div>

    <div class="flex items-center justify-center p-7">
      <button
        class="rounded-full w-28 h-28 flex items-center justify-center shadow transition active:scale-95
               bg-blue-500 hover:bg-blue-600 text-white"
        :aria-pressed="localPlaying"
        :title="localPlaying ? 'Pausar' : 'Reproducir'"
        @click="toggle"
      >
        <i class="pi text-4xl" :class="localPlaying ? 'pi-pause' : 'pi-volume-up'"></i>
      </button>
    </div>

    <div class="mt-4 text-center text-blue-500 font-medium">
      {{ timeLabel }}
    </div>

    <audio ref="audioRef" preload="metadata" playsinline></audio>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, watch, onBeforeUnmount } from 'vue'

const props = withDefaults(defineProps<{
  src: string | Blob
  title?: string
  description?: string
  showReset?: boolean
  duration?: number
  maxWidthClass?: string
  minHeightClass?: string
}>(), {
  title: 'Grabación',
  showReset: true,
  duration: undefined,
  maxWidthClass: 'max-w-sm',
  minHeightClass: 'min-h-[20rem]',
})

const emit = defineEmits<{
  (e: 'playing', value: boolean): void
  (e: 'tick', seconds: number): void
  (e: 'ended'): void
  (e: 'reset'): void
}>()

const audioRef = ref<HTMLAudioElement | null>(null)
const localPlaying = ref(false)
const current = ref(0)

const timeLabel = computed(() => {
  const base = current.value > 0 ? current.value : (props.duration ?? 0)
  const t = Math.floor(base || 0)
  const m = String(Math.floor(t / 60)).padStart(2, '0')
  const s = String(t % 60).padStart(2, '0')
  return `${m}:${s}`
})

let lastObjectUrl: string | null = null
function setSrc(src: string | Blob | null) {
  const el = audioRef.value
  if (!el) return
  if (lastObjectUrl) { URL.revokeObjectURL(lastObjectUrl); lastObjectUrl = null }
  if (src === null) { el.removeAttribute('src'); el.load(); return }
  if (typeof src === 'string') el.src = src
  else { lastObjectUrl = URL.createObjectURL(src); el.src = lastObjectUrl }
  el.load()
}

function onTime()  { const el = audioRef.value; if (!el) return; current.value = el.currentTime || 0; emit('tick', current.value) }
function onPlay()  { localPlaying.value = true;  emit('playing', true) }
function onPause() { localPlaying.value = false; emit('playing', false) }
function onEnded() {
  const el = audioRef.value; if (!el) return
  el.currentTime = 0
  current.value = 0
  localPlaying.value = false
  emit('playing', false)
  emit('ended')
}

function attach() {
  const el = audioRef.value; if (!el) return
  el.addEventListener('timeupdate', onTime)
  el.addEventListener('play', onPlay)
  el.addEventListener('pause', onPause)
  el.addEventListener('ended', onEnded)
}
function detach() {
  const el = audioRef.value; if (!el) return
  el.removeEventListener('timeupdate', onTime)
  el.removeEventListener('play', onPlay)
  el.removeEventListener('pause', onPause)
  el.removeEventListener('ended', onEnded)
}

async function toggle() {
  const el = audioRef.value; if (!el) return
  if (el.paused) { try { await el.play() } catch {} }
  else el.pause()
}

watch(() => props.src, (s) => {
  setSrc(s ?? null)
  const el = audioRef.value
  if (el) { el.pause(); el.currentTime = 0 }
  current.value = 0
  localPlaying.value = false
  emit('playing', false)
  emit('tick', 0)
}, { immediate: true })

watch(audioRef, (el, old) => { if (old) detach(); if (el) attach() }, { immediate: true })

onBeforeUnmount(() => {
  detach()
  if (audioRef.value) audioRef.value.pause()
  if (lastObjectUrl) URL.revokeObjectURL(lastObjectUrl)
})
</script>

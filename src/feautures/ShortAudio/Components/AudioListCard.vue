<template>
  <div class="relative w-full max-w-sm rounded-2xl border border-blue-400 bg-white shadow p-6 mx-auto">
    <div class="flex items-center justify-between mb-4">
      <div class="text-gray-800 font-semibold">
        {{ headerTitle || title || 'Audio' }}
      </div>

      <div class="flex items-center gap-3">
        <button
          v-if="showFavorite"
          :aria-pressed="favorite"
          class="transition"
          :class="favorite ? 'text-blue-600' : 'text-gray-400 hover:text-blue-500'"
          :title="favorite ? 'Quitar de favoritos' : 'Agregar a favoritos'"
          @click="toggleFavorite"
        >
          <i class="pi text-xl" :class="favorite ? 'pi-heart-fill' : 'pi-heart'"></i>
        </button>

        <button
          v-if="showReset"
          class="text-blue-600 hover:text-blue-700"
          title="Reiniciar"
          @click="resetAll"
        >
          <i class="pi pi-trash text-xl"></i>
        </button>
      </div>
    </div>

    <div class="mb-4">
      <p v-if="description" class="mt-1 text-sm text-gray-600 desc-clamp">
        {{ description }}
      </p>
    </div>

    <div class="flex items-center justify-center">
      <button
        class="rounded-full w-20 h-20 flex items-center justify-center shadow transition active:scale-95
               bg-blue-500 hover:bg-blue-600 text-white"
        :aria-pressed="localPlaying"
        :title="localPlaying ? 'Pausar' : 'Reproducir'"
        @click="toggle"
      >
        <i class="pi text-3xl" :class="localPlaying ? 'pi-pause' : 'pi-volume-up'"></i>
      </button>
    </div>

    <div class="mt-4 text-center text-blue-500 font-medium">
      {{ timeLabel }}
    </div>

    <transition name="fade">
      <p v-if="showFavMsg" class="mt-3 text-center text-sm text-blue-600">
        Este audio ha sido colocado en tus favoritos
      </p>
    </transition>

    <audio ref="audioRef" preload="metadata" playsinline></audio>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, watch, onBeforeUnmount } from 'vue'

const props = withDefaults(defineProps<{
  src: string | Blob
  showReset?: boolean
  duration?: number
  showFavorite?: boolean
  defaultFavorite?: boolean
  favMessageMs?: number
  title?: string
  description?: string
  headerTitle?: string
}>(), {
  showReset: false,
  duration: undefined,
  showFavorite: true,
  defaultFavorite: false,
  favMessageMs: 1600,
  title: undefined,
  description: undefined,
  tags: () => [],
  headerTitle: undefined,
})

const emit = defineEmits<{
  (e: 'playing', value: boolean): void
  (e: 'tick', seconds: number): void
  (e: 'ended'): void
  (e: 'reset'): void
  (e: 'toggle-fav', value: boolean): void
}>()

const audioRef = ref<HTMLAudioElement | null>(null)
const localPlaying = ref(false)
const current = ref(0)

/** manejo de favoritos */
const favorite = ref(!!props.defaultFavorite)
const showFavMsg = ref(false)
let favTimer: number | null = null

function toggleFavorite() {
  favorite.value = !favorite.value
  emit('toggle-fav', favorite.value)
  if (favorite.value) {
    showFavMsg.value = true
    if (favTimer) window.clearTimeout(favTimer)
    favTimer = window.setTimeout(() => { showFavMsg.value = false }, props.favMessageMs)
  } else {
    showFavMsg.value = false
    if (favTimer) { window.clearTimeout(favTimer); favTimer = null }
  }
}

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
function onEnded() { const el = audioRef.value; if (!el) return; el.currentTime = 0; current.value = 0; localPlaying.value = false; emit('playing', false); emit('ended') }

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

function resetAll() {
  const el = audioRef.value
  if (el) { el.pause(); el.currentTime = 0 }
  current.value = 0
  localPlaying.value = false
  emit('playing', false)
  emit('tick', 0)
  emit('reset')
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
  if (favTimer) window.clearTimeout(favTimer)
})
</script>

<style scoped>
.fade-enter-active, .fade-leave-active { transition: opacity .2s ease; }
.fade-enter-from, .fade-leave-to { opacity: 0; }

.desc-clamp {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
</style>

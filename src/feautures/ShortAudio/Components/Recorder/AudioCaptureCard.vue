<template>
  <div class="w-full max-w-sm mx-auto p-4 bg-white rounded-2xl shadow">
    <div class="text-center mb-3">
      <div class="font-semibold text-gray-900">{{ title }}</div>
      <p v-if="description" class="text-sm text-gray-600 mt-1 desc-clamp">
        {{ description }}
      </p>
    </div>

    <div class="flex justify-center my-4 items-center min-h-[7rem]">
      <button
        v-if="!hasFile"
        class="rounded-full w-28 h-28 flex items-center justify-center shadow transition active:scale-95
               bg-blue-500 hover:bg-blue-600 text-white"
        @click="toggleRecord"
        :title="isRecording ? 'Detener' : 'Iniciar grabación'"
      >
        <i class="pi text-4xl" :class="isRecording ? 'pi-stop' : 'pi-microphone'"></i>
      </button>

      <div
        v-else
        class="w-[18rem] bg-gray-100 rounded-full px-3 py-2 flex items-center justify-between"
      >
        <button
          class="w-9 h-9 rounded-full bg-blue-500 text-white flex items-center justify-center"
          @click="togglePlay"
          :title="isPlaying ? 'Pausar' : 'Escuchar'"
        >
          <i class="pi" :class="isPlaying ? 'pi-pause' : 'pi-volume-up'"></i>
        </button>

        <span class="text-sky-600 font-medium">
          {{ currentClock }}
        </span>

        <button class="text-blue-600" @click="handleDelete" title="Eliminar">
          <i class="pi pi-trash text-lg"></i>
        </button>
      </div>
    </div>

    <div v-if="!hasFile" class="text-center text-sky-500 font-medium text-lg mb-3">
      {{ elapsedClock }} / 02:00
    </div>

    <audio ref="audioRef"></audio>

    <p v-if="errorMsg" class="text-red-600 text-sm text-center mt-2">{{ errorMsg }}</p>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, watchEffect, onMounted } from 'vue'
import {
  isRecording, elapsedClock, errorMsg, fileRef, audioUrl, blobRef
} from '../../Hooks/Recorder/state'
import { useMicPermission } from '../../Hooks/Recorder/useMicPermission'
import { useAudioPlayer } from '../../Hooks/Recorder/useAudioPlayer'
import { useStartRecording } from '../../Hooks/Recorder/useStartRecording'
import { useStopRecording } from '../../Hooks/Recorder/useStopRecording'
import { useResetRecording } from '../../Hooks/Recorder/useResetRecording'

const props = withDefaults(defineProps<{
  persist?: boolean
  title?: string
  description?: string
}>(), {
  persist: false,
  title: 'Grabación',
  description: undefined
})

const audioRef = ref<HTMLAudioElement | null>(null)
const {
  isPlaying,
  currentClock,
  toggle: togglePlay,
  load,
  stop: stopPlay
} = useAudioPlayer(audioRef)

const { hasPermission, request } = useMicPermission()
const { start } = useStartRecording()
const { stop }  = useStopRecording()
const { reset: resetRecording } = useResetRecording()

const hasFile = computed(() => !!(fileRef.value && audioUrl.value))

watchEffect(() => {
  if (hasFile.value && audioUrl.value) {
    load(audioUrl.value)
    stopPlay() 
    if (props.persist && blobRef.value) cacheAudio('last-audio', blobRef.value).catch(() => {})
  } else {
    load(null)
  }
})

async function toggleRecord() {
  if (isRecording.value) {
    await stop()              
  } else {
    if (!hasPermission.value) await request()
    await start()             
  }
}

function handleDelete() {
  stopPlay()
  load(null)
  resetRecording()
  if (props.persist) clearCachedAudio('last-audio').catch(() => {})
}

onMounted(async () => {
  if (!props.persist) return
  const cached = await getCachedAudio('last-audio').catch(() => null)
  if (cached) {
    const type = cached.type || 'audio/webm'
    const f = new File([cached], `audio-cached.${type.includes('ogg') ? 'ogg' : 'webm'}`, { type })
    fileRef.value = f
    blobRef.value = cached
    audioUrl.value = URL.createObjectURL(cached)
  }
})

function openDB(): Promise<IDBDatabase> {
  return new Promise((resolve, reject) => {
    const req = indexedDB.open('audio-cache-db', 1)
    req.onupgradeneeded = () => {
      const db = req.result
      if (!db.objectStoreNames.contains('audios')) db.createObjectStore('audios')
    }
    req.onsuccess = () => resolve(req.result)
    req.onerror = () => reject(req.error)
  })
}
async function cacheAudio(key: string, blob: Blob) {
  const db = await openDB()
  await new Promise<void>((resolve, reject) => {
    const tx = db.transaction('audios', 'readwrite')
    tx.objectStore('audios').put(blob, key)
    tx.oncomplete = () => resolve()
    tx.onerror = () => reject(tx.error)
  })
  db.close()
}
async function getCachedAudio(key: string): Promise<Blob | null> {
  const db = await openDB()
  const out = await new Promise<Blob | null>((resolve, reject) => {
    const tx = db.transaction('audios', 'readonly')
    const req = tx.objectStore('audios').get(key)
    req.onsuccess = () => resolve((req.result as Blob) ?? null)
    req.onerror = () => reject(req.error)
  })
  db.close()
  return out
}
async function clearCachedAudio(key: string) {
  const db = await openDB()
  await new Promise<void>((resolve, reject) => {
    const tx = db.transaction('audios', 'readwrite')
    tx.objectStore('audios').delete(key)
    tx.oncomplete = () => resolve()
    tx.onerror = () => reject(tx.error)
  })
  db.close()
}
</script>

<style scoped>
.desc-clamp {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
</style>

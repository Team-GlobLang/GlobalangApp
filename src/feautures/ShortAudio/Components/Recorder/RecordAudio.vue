<template>
  <div class="w-full max-w-sm mx-auto p-4 bg-white rounded-xl shadow">
    <label class="front-semibold py-8">
      Record your audio
     <span v-if="props.errorMessage" class="text-red-600">*</span>
    </label>
    <div v-if="!audioFile" class="flex items-center justify-center gap-4 pt-2">
      <FwbButton
        type="button"
        class="bg-blue-500 hover:bg-blue-600 text-white rounded-full w-24 h-24 flex items-center justify-center transition-all"
        @click="toggleRecord"
      >
        <i
          class="text-4xl"
          :class="isRecording ? 'pi pi-stop' : 'pi pi-microphone'"
        ></i>
      </FwbButton>
    </div>

    <div v-else class="w-[18rem] h-[4rem] bg-gray-100 rounded-full px-3 py-4 flex items-center justify-between">
      <FwbButton
          type="button"
          class="w-10 h-10 rounded-full bg-blue-600 text-white flex items-center justify-center"
          @click="togglePlay"
        >
          <i class="pi" :class="isPlaying ? 'pi pi-pause' : 'pi pi-volume-up'"></i>
      </FwbButton>
      <button class="w-10 h-12 text-blue-600" @click="handleDelete" title="Eliminar">
          <i class="pi pi-trash text-lg"></i>
      </button>
    </div>

    <div class="text-center text-sky-500 font-medium text-lg mt-3">
      {{ bottomClock }} / 02:00
     </div>
    <audio ref="audioRef"></audio>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, watchEffect } from 'vue'
import { fileRef, audioUrl, isRecording, elapsedClock } from '../../../ShortAudio/Hooks/Recorder/state';
import { useAudioPlayer } from '../../../ShortAudio/Hooks/Recorder/useAudioPlayer';
import { useMicPermission } from '../../../ShortAudio/Hooks/Recorder/useMicPermission';
import { useResetRecording } from '../../../ShortAudio/Hooks/Recorder/useResetRecording';
import { useStartRecording } from '../../../ShortAudio/Hooks/Recorder/useStartRecording';
import { useStopRecording } from '../../../ShortAudio/Hooks/Recorder/useStopRecording';
import { FwbButton } from 'flowbite-vue';

const audioRef = ref<HTMLAudioElement | null>(null)

const props = withDefaults(defineProps<{
    errorMessage?: string
}>(), {
    errorMessage: ''
})
const emit = defineEmits<{ (e: 'update:file', file: File | null): void }>()

const { isPlaying, currentClock, toggle: togglePlay, load, stop: stopPlay } = useAudioPlayer(audioRef)
const { hasPermission, request } = useMicPermission()
const { start } = useStartRecording()
const { stop } = useStopRecording()
const { reset: resetRecording } = useResetRecording()

const bottomClock = computed(() => {
  if (isRecording.value || !audioFile.value) return elapsedClock.value || '00:00'
  return isPlaying.value ? currentClock.value : '00:00'
})

const audioFile = computed(() => fileRef.value)

watchEffect(() => {
  if (audioFile.value && audioUrl.value) {
    load(audioUrl.value)
    stopPlay()
    emit('update:file', audioFile.value)
  } else {
    load(null)
    emit('update:file', null)
  }
})

async function toggleRecord() {
  if (isRecording.value) await stop()
  else {
    if (!hasPermission.value) await request()
    await start()
  }
}

function handleDelete() {
  stopPlay()
  load(null)
  resetRecording()
}
</script>

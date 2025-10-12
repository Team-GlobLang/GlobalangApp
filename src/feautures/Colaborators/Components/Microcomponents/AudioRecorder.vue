<template>
  <div class="w-full max-w-sm mx-auto p-4 bg-white rounded-xl shadow">
    <label>
      Record your audio
      <span v-if="props.errorMessage" class="text-red-600">*</span>
    </label>

    <div v-if="!audioFile" class="flex items-center justify-center gap-4 pt-2">
      <FwbButton type="button" outline pill square @click="toggleRecord">
        <i class="pi text-2xl p-2" :class="isRecording ? 'pi-stop' : 'pi-microphone'"></i>
      </FwbButton>
      <span class="font-mono text-lg">{{ currentClock }}</span>
    </div>

    <div v-else class="flex items-center justify-center gap-4">
      <FwbButton outline type="button" pill square @click="togglePlay">
        <i class="pi text-2xl p-2" :class="isPlaying ? 'pi-pause' : 'pi-play'"></i>
      </FwbButton>

      <span class="font-mono">{{ currentClock }}</span>

      <button type="button" @click="handleDelete" class="text-red-500">
        <i class="pi pi-trash text-lg"></i>
      </button>
    </div>

    <audio ref="audioRef"></audio>
  </div>
</template>

<script setup lang="ts">
import { ref,  watchEffect } from 'vue'
import { FwbButton } from 'flowbite-vue'
import { useRecorder } from '@RecordHooks';

const props = withDefaults(
  defineProps<{ errorMessage?: string }>(),
  { errorMessage: '' }
)
const emit = defineEmits<{ (e: 'update:file', file: File | null): void }>()

const audioRef = ref<HTMLAudioElement | null>(null)

const {
  audioFile,
  isRecording,
  isPlaying,
  currentClock,
  toggleRecord,
  togglePlay,
  handleDelete
} = useRecorder()

watchEffect(() => {
  if (audioFile.value) {
    emit('update:file', audioFile.value)
  } else {
    emit('update:file', null)
  }
})
</script>

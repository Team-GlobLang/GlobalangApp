<template>
  <div class="inline-flex">
    <FwbButton
      type="button"
      class="bg-blue-500 hover:bg-blue-600 text-white rounded-full w-24 h-24 flex items-center justify-center transition-all"
      :class="file ? 'bg-blue-600 hover:bg-blue-600' : 'bg-blue-600 cursor-not-allowed'"
      @click="togglePlay"
    >
      <i class="text-4xl" :class="isPlaying ? 'pi pi-pause' : 'pi pi-volume-up'"></i>
    </FwbButton>

    <audio ref="audioRef"></audio>
  </div>
</template>

<script setup lang="ts">
import { ref, watch, onBeforeUnmount } from 'vue'
import { FwbButton } from 'flowbite-vue'
import { useAudioPlayer } from '../../Hooks/Recorder/useAudioPlayer'

const props = defineProps<{
  file?: File | null
}>()

const audioRef = ref<HTMLAudioElement | null>(null)
const { isPlaying, toggle: togglePlay, load, stop } = useAudioPlayer(audioRef)

let objectUrl: string | null = null

function applyFile() {
  stop()
  if (objectUrl) {
    URL.revokeObjectURL(objectUrl)
    objectUrl = null
  }
  if (props.file instanceof Blob) {
    objectUrl = URL.createObjectURL(props.file)
    load(objectUrl)
  } else {
    load(null)
  }
}

watch(() => props.file, applyFile, { immediate: true })

onBeforeUnmount(() => {
  stop()
  if (objectUrl) URL.revokeObjectURL(objectUrl)
})
</script>

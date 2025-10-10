<template>
  <div class="relative w-full bg-white p-4 rounded-lg shadow">
    <button
      type="button"
      class="absolute top-3 right-3 text-gray-300 hover:text-red-500 transition disabled:opacity-50"
      :aria-pressed="localSelected"
      :title="localSelected ? 'Selected' : 'Select'"
      @click.stop="toggleSelected"
    >
      <i class="pi text-xl" :class="localSelected ? 'pi-heart-fill text-red-500' : 'pi-heart'"></i>
    </button>

    <h3 class="font-semibold truncate">{{ item.text }}</h3>
    <p class="text-gray-600 text-sm truncate">{{ item.description }}</p>

    <div class="mt-3 flex flex-col items-center">
      <button
        type="button"
        class="w-28 h-28 rounded-full bg-blue-600 hover:bg-blue-700 text-white flex items-center justify-center disabled:opacity-50"
        :disabled="!item.fileUrl"
        :aria-pressed="isPlaying"
        @click="toggle"
      >
        <i class="pi" :class="isPlaying ? 'pi-pause text-3xl' : 'pi-volume-up text-4xl'"></i>
      </button>
    </div>

    <audio
      ref="audioRef"
      :src="item.fileUrl"
      preload="metadata"
      @play="isPlaying = true"
      @pause="isPlaying = false"
      @ended="isPlaying = false"
    />
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'

type ShortAudio = {
  id: string
  text: string
  description: string
  fileUrl: string
}


const props = withDefaults(defineProps<{
  item: ShortAudio
  selected?: boolean
}>(), {
  selected: false,
})

const emit = defineEmits<{
  (e: 'update:selected', value: boolean): void
  (e: 'toggle-select', payload: { id: string; selected: boolean }): void
}>()

const audioRef = ref<HTMLAudioElement | null>(null)
const isPlaying = ref(false)

const localSelected = ref<boolean>(props.selected)
watch(() => props.selected, v => { localSelected.value = v })

function toggleSelected() {
  const next = !localSelected.value
  localSelected.value = next
  emit('update:selected', next) 
  emit('toggle-select', { id: props.item.id, selected: next }) 
}

function toggle() {
  const el = audioRef.value
  if (!el) return
  el.paused ? el.play().catch(() => {}) : el.pause()
}

watch(() => props.item.fileUrl, () => {
  const el = audioRef.value
  if (el) {
    el.load()
    isPlaying.value = false
  }
})
</script>

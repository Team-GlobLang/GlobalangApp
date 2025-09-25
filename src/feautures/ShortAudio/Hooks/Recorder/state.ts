import { ref, computed } from 'vue'

export const isRecording = ref(false)
export const isPaused = ref(false)
export const elapsedMs = ref(0)
export const errorMsg = ref('')

export const blobRef = ref<Blob | null>(null)
export const fileRef = ref<File | null>(null)
export const audioUrl = ref<string | null>(null)

export const maxSeconds = 120
export const maxBytes = 50 * 1024 * 1024 // como el de pau

export const elapsedClock = computed(() => {
  const s = Math.floor(elapsedMs.value / 1000)
  const mm = String(Math.floor(s / 60)).padStart(2, '0')
  const ss = String(s % 60).padStart(2, '0')
  return `${mm}:${ss}`
})

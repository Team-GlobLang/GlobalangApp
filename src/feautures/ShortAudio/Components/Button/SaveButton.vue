<template>
  <button
    :type="type"
    :disabled="disabled || loading"
    class="inline-flex items-center justify-center gap-2
           rounded-2xl bg-blue-500 text-white text-lg font-semibold shadow
           hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-300
           disabled:opacity-50 disabled:cursor-not-allowed"
    :class="[full ? 'w-full h-12' : 'px-5 h-11']"
    :aria-busy="loading ? 'true' : 'false'"
    @click="handleClick"
  >
    <svg v-if="loading" class="h-5 w-5 animate-spin" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"/>
      <path class="opacity-75" d="M4 12a8 8 0 0 1 8-8v4" stroke="currentColor" stroke-width="4" stroke-linecap="round"/>
    </svg>

    <slot>{{ label }}</slot>
  </button>
</template>

<script setup lang="ts">
const {
  label = 'Save',
  loading = false,
  disabled = false,
  type = 'button',               
  full = true
} = defineProps<{
  label?: string
  loading?: boolean
  disabled?: boolean
  type?: 'submit' | 'button' | 'reset'
  full?: boolean
}>()

const emit = defineEmits<{ (e: 'click', evt: MouseEvent): void }>()

function handleClick(evt: MouseEvent) {
  emit('click', evt)
}
</script>

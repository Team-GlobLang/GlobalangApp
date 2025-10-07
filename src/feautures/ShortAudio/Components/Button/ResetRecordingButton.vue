<template>
  <button
    type="button"
    class="px-3 py-2 rounded-lg bg-gray-100 text-gray-700 hover:bg-gray-200 disabled:opacity-60 disabled:cursor-not-allowed"
    :disabled="isPending"
    @click="onReset"
    title="Reset recording"
  >
    <span v-if="isPending">Clearing…</span>
    <span v-else>Reset</span>
  </button>
</template>

<script setup lang="ts">
import { useResetRecording } from '../../Hooks/Recorder/useResetRecording'

const { reset, isPending } = useResetRecording()

async function onReset() {
  try { await reset() } catch {  }
}
</script>

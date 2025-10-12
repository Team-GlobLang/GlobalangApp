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

      <button type="button" class="text-red-500" @click="handleDelete">
        <i class="pi pi-trash text-lg"></i>
      </button>
    </div>

    <audio ref="audioRef"></audio>
  </div>
</template>

<script setup lang="ts">
import { withDefaults, defineProps, defineEmits, watch } from "vue";
import { FwbButton } from "flowbite-vue";
import { useRecorder } from "@RecordHooks";

const props = withDefaults(
  defineProps<{ modelValue?: File | null; errorMessage?: string }>(),
  { errorMessage: "", modelValue: null }
);
const emit = defineEmits<{ (e: "update:modelValue", file: File | null): void }>();

const {
  audioRef,
  audioFile,
  isRecording,
  isPlaying,
  currentClock,
  toggleRecord,
  togglePlay,
  handleDelete,
} = useRecorder();

watch(
  () => audioFile.value,
  (val) => emit("update:modelValue", val)
);
</script>
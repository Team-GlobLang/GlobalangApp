<template>
  <div class="w-full max-w-sm mx-auto p-4 bg-white rounded-xl shadow">
    <label class="font-semibold py-8">
      Record your audio
      <span v-if="props.errorMessage" class="text-red-600">*</span>
    </label>

    <div
      v-if="!audioFile"
      class="flex flex-col items-center justify-center gap-4 pt-2"
    >
      <FwbButton
        type="button"
        class="bg-blue-500 hover:bg-blue-600 text-white rounded-full w-20 h-20 flex items-center justify-center transition-all"
        @click="toggleRecord"
      >
        <i
          class="pi !text-[2rem]"
          :class="isRecording ? 'pi-stop' : 'pi-microphone'"
        ></i>
      </FwbButton>
      <span class="font-mono text-lg">{{ currentClock }} / 02:00</span>
    </div>

    <div
      v-else
      class="w-[18rem] h-[4rem] bg-gray-100 rounded-full px-3 py-4 flex items-center justify-between"
    >
      <FwbButton
        type="button"
        class="w-10 h-10 rounded-full bg-blue-600 text-white flex items-center justify-center"
        @click="togglePlay"
      >
        <i
          class="pi"
          style="size: 6rem"
          :class="isPlaying ? 'pi pi-pause' : 'pi pi-volume-up'"
        ></i>
      </FwbButton>
      <button
        class="w-10 h-12 text-blue-600"
        @click="handleDelete"
        title="Delete"
      >
        <i class="pi pi-trash text-lg"></i>
      </button>
    </div>
    <audio ref="audioRef"></audio>
  </div>
</template>

<script setup lang="ts">
import { withDefaults, defineProps, defineEmits, watchEffect } from "vue";
import { FwbButton } from "flowbite-vue";
import { useRecorder } from "@RecordHooks";

const props = withDefaults(defineProps<{ errorMessage?: string }>(), {
  errorMessage: "",
});
const emit = defineEmits<{ (e: "update:file", file: File | null): void }>();

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

watchEffect(() => {
  if (audioFile.value) emit("update:file", audioFile.value);
  else emit("update:file", null);
});
</script>

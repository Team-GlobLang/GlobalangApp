<template>
  <div
    class="w-full bg-white rounded-2xl p-4 flex items-center hover:shadow-md transition"
  >
    <button
      class="flex-shrink-0 rounded-full w-14 h-14 flex items-center justify-center bg-blue-500 hover:bg-blue-600 text-white shadow active:scale-95 transition"
      :aria-pressed="localPlaying"
      :title="localPlaying ? 'Stop' : 'Play'"
      @click="toggle"
    >
      <i class="pi text-2xl" :class="localPlaying ? 'pi-pause' : 'pi-play'"></i>
    </button>

    <div class="flex-1 ml-4 flex flex-col justify-between">
      <div class="flex justify-between items-start">
        <h3 class="font-semibold text-gray-800 text-base truncate">
          {{ text }}
        </h3>
        <FwbBadge :type="badgeType">{{ approvalText }}</FwbBadge>
      </div>

      <div class="mt-1 text-gray-600 text-sm flex flex-col gap-0.5">
        <p v-if="country">From {{ country }}</p>
        <p v-if="createBy">By: {{ createBy }}</p>
        <p v-if="description" class="line-clamp-2">{{ description }}</p>
        <p class="text-black">{{ durationLabel }}</p>

        <p
          v-if="approved === false && reviewComment"
          class="text-red-600 italic"
        >
          Reason: {{ reviewComment }}
        </p>
      </div>
    </div>

    <audio
      ref="audioRef"
      :src="fileUrl"
      preload="metadata"
      @loadedmetadata="onLoadedMetadata"
      @ended="onEnded"
    ></audio>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from "vue";
import { FwbBadge } from "flowbite-vue";
import type { MyShortsInterface } from "../../Interfaces/Shorts.interface";

const props = defineProps<MyShortsInterface>();

const audioRef = ref<HTMLAudioElement | null>(null);
const localPlaying = ref(false);
const duration = ref(0);

function toggle() {
  if (!audioRef.value) return;
  if (localPlaying.value) audioRef.value.pause();
  else audioRef.value.play();
  localPlaying.value = !localPlaying.value;
}

function onEnded() {
  localPlaying.value = false;
}

function onLoadedMetadata() {
  if (audioRef.value) duration.value = Math.floor(audioRef.value.duration);
}

const durationLabel = computed(() => {
  if (!duration.value) return "--:--";
  const m = Math.floor(duration.value / 60);
  const s = duration.value % 60;
  return `${m}:${s.toString().padStart(2, "0")}`;
});

const badgeType = computed(() => {
  if (props.approved === null) return "yellow";
  if (props.approved === false) return "red";
  return "green";
});

const approvalText = computed(() => {
  if (props.approved === null) return "Pending";
  if (props.approved === false) return "Rejected";
  return "Approved";
});

const reviewComment = computed(() => props.reviewComment || "");
</script>

<style scoped>
.line-clamp-2 {
  display: -webkit-box;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
</style>

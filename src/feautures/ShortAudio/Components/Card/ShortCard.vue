<template>
  <div
    class="w-full bg-white rounded-2xl shadow-2xl p-4 flex items-center gap-4 hover:shadow-md transition relative"
  >
    <button
      class="flex-shrink-0 rounded-full w-14 h-14 flex items-center justify-center bg-blue-500 hover:bg-blue-600 text-white shadow active:scale-95 transition"
      :aria-pressed="localPlaying"
      :title="localPlaying ? 'Pausar' : 'Reproducir'"
      @click="toggle"
    >
      <i class="pi text-2xl" :class="localPlaying ? 'pi-pause' : 'pi-play'"></i>
    </button>

    <div class="flex-1 min-w-0">
      <div class="flex items-start justify-between">
        <h3 class="font-semibold text-gray-800 text-base truncate">
          {{ text }}
        </h3>

        <button
          :aria-pressed="favorite"
          class="transition ml-3"
          :class="
            favorite ? 'text-blue-600' : 'text-gray-400 hover:text-blue-500'
          "
          :title="favorite ? 'Quitar de favoritos' : 'Agregar a favoritos'"
          @click.stop="toggleFavorite"
        >
          <i
            class="pi text-lg"
            :class="favorite ? 'pi-heart-fill' : 'pi-heart'"
          ></i>
        </button>
      </div>

      <p v-if="country" class="text-gray-500 text-sm mt-0.5">
        From {{ country }}
      </p>

      <p v-if="description" class="text-gray-600 text-sm line-clamp-2 mt-1">
        {{ description }}
      </p>
      <p v-if="createBy" class="text-gray-600 text-sm mt-1">
        By: {{ createBy }}
      </p>

      <div class="text-gray-700 text-sm font-medium mt-2">
        {{ durationLabel }}
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
import { ref, computed, watchEffect } from "vue";
import type { AvailableShortsInterface } from "../../Interfaces/Shorts.interface";

const props = defineProps<AvailableShortsInterface>();

const audioRef = ref<HTMLAudioElement | null>(null);
const localPlaying = ref(false);
const favorite = ref(false);
const duration = ref(0);

watchEffect(() => {
  const favs = JSON.parse(localStorage.getItem("favorites") || "[]");
  favorite.value = favs.includes(props.id);
});

function toggle() {
  if (!audioRef.value) return;
  if (localPlaying.value) {
    audioRef.value.pause();
  } else {
    audioRef.value.play();
  }
  localPlaying.value = !localPlaying.value;
}

function onEnded() {
  localPlaying.value = false;
}

function toggleFavorite() {
  const favs: string[] = JSON.parse(localStorage.getItem("favorites") || "[]");
  if (favorite.value) {
    favorite.value = false;
    const index = favs.indexOf(props.id);
    if (index !== -1) favs.splice(index, 1);
  } else {
    favorite.value = true;
    favs.push(props.id);
  }
  localStorage.setItem("favorites", JSON.stringify(favs));
}

function onLoadedMetadata() {
  if (audioRef.value) {
    duration.value = Math.floor(audioRef.value.duration);
  }
}

const durationLabel = computed(() => {
  if (!duration.value) return "--:--";
  const m = Math.floor(duration.value / 60);
  const s = duration.value % 60;
  return `${m}:${s.toString().padStart(2, "0")}`;
});
</script>

<style scoped>
.line-clamp-2 {
  display: -webkit-box;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
</style>

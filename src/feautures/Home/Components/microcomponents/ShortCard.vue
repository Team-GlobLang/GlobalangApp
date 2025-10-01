<template>
    <div class="  min-w-full bg-white rounded-2xl p-6 relative flex flex-col">

        <div class="absolute top-7 right-4">
            <button :aria-pressed="favorite" class="transition"
                :class="favorite ? 'text-blue-600' : 'text-gray-400 hover:text-blue-500'"
                :title="favorite ? 'Quitar de favoritos' : 'Agregar a favoritos'" @click="toggleFavorite">
                <i class="pi text-xl" :class="favorite ? 'pi-heart-fill' : 'pi-heart'"></i>
            </button>
        </div>

        <div class="text-gray-800 font-semibold truncate">
            {{ text }}
        </div>

        <div class="text-gray-500 text-sm truncate">
            {{ country ? `From ${country}` : '' }}
        </div>

        <p v-if="description" class="text-sm text-gray-600 desc-clamp">
            {{ description }}
        </p>

        <div>
            <div class="flex items-center justify-center">
                <button class="rounded-full w-20 h-20 flex items-center justify-center shadow transition active:scale-95
            bg-blue-500 hover:bg-blue-600 text-white" :aria-pressed="localPlaying"
                    :title="localPlaying ? 'Pausar' : 'Reproducir'" @click="toggle">
                    <i class="pi text-3xl" :class="localPlaying ? 'pi-pause' : 'pi-play'"></i>
                </button>
            </div>
            <div class="mt-2 text-center text-gray-700 font-medium">
                {{ timeLabel }}
            </div>

        </div>
        <audio ref="audioRef" :src="fileUrl" preload="metadata" @loadedmetadata="onLoadedMetadata"
            @timeupdate="updateTime" @ended="onEnded"></audio>
    </div>
</template>

<script setup lang="ts">
import { ref, computed, watchEffect } from "vue";
import type { ShortInterface } from "../../Interfaces/short-interface";



const props = defineProps<ShortInterface>();

const audioRef = ref<HTMLAudioElement | null>(null);
const localPlaying = ref(false);
const favorite = ref(false);
const currentTime = ref(0);
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

function updateTime() {
    if (audioRef.value) {
        currentTime.value = Math.floor(audioRef.value.currentTime);
    }
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

const timeLabel = computed(() => {
    const format = (t: number) =>
        `${Math.floor(t / 60).toString().padStart(2, "0")}:${(t % 60).toString().padStart(2, "0")}`;
    return `${format(currentTime.value)} / ${duration.value ? format(duration.value) : "--:--"}`;
});
</script>

<style scoped>
.desc-clamp {
    display: -webkit-box;
    -webkit-box-orient: vertical;
    overflow: hidden;
}
</style>

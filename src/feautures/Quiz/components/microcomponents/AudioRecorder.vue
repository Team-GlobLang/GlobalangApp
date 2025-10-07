<template>
    <div class="w-full max-w-sm mx-auto p-4 bg-white rounded-xl shadow">
        <label>
            Record your audio
            <span v-if="props.errorMessage" class="text-red-600">*</span>
        </label>

        <!-- Grabando / mostrar boton -->
        <div v-if="!audioFile" class="flex items-center justify-center gap-4 pt-2">
            <FwbButton type="button" outline pill square @click="toggleRecord">
                <i class="pi text-2xl p-2" :class="isRecording ? 'pi-stop' : 'pi-microphone'"></i>
            </FwbButton>
            <span class="font-mono text-lg">{{ elapsedClock }}</span>
        </div>

        <!-- Reproducción -->
        <div v-else class="flex items-center justify-center gap-4">
            <FwbButton outline type="button" pill square @click="togglePlay">
                <i class="pi text-2xl p-2" :class="isPlaying ? 'pi-pause' : 'pi-play'"></i>
            </FwbButton>

            <span class="font-mono">{{ currentClock }}</span>

            <button type="button" class="text-red-500" @click="() => handleDelete(true)">
                <i class="pi pi-trash text-lg"></i>
            </button>

        </div>

        <audio ref="audioRef"></audio>
    </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onBeforeUnmount, watch } from 'vue';
import { FwbButton } from 'flowbite-vue';

const props = withDefaults(
    defineProps<{ modelValue?: File | null; errorMessage?: string }>(),
    { errorMessage: '', modelValue: null }
);
const emit = defineEmits<{ (e: 'update:modelValue', file: File | null): void }>();

// --- Local state ---
const audioRef = ref<HTMLAudioElement | null>(null);
const audioFile = ref<File | null>(props.modelValue || null);
const audioUrl = ref<string | null>(props.modelValue ? URL.createObjectURL(props.modelValue) : null);
const isRecording = ref(false);
const elapsedTime = ref(0);

// --- Media Recorder ---
let mediaRecorder: MediaRecorder | null = null;
let chunks: BlobPart[] = [];

// --- Audio Player ---
const isPlaying = ref(false);
const duration = ref(0);
const current = ref(0);

const currentClock = computed(() => toClock(current.value));
const elapsedClock = computed(() => toClock(elapsedTime.value));

function toClock(sec: number) {
    const s = Math.max(0, Math.floor(sec || 0));
    const mm = String(Math.floor(s / 60)).padStart(2, '0');
    const ss = String(s % 60).padStart(2, '0');
    return `${mm}:${ss}`;
}

// --- Watch modelValue changes ---
watch(
    () => props.modelValue,
    (val) => {
        if (val) {
            audioFile.value = val;
            audioUrl.value = URL.createObjectURL(val);
            loadAudio();
        } else {
            handleDelete(false);
        }
    }
);

// --- Recording ---
async function toggleRecord() {
    if (isRecording.value) return stopRecord();
    await startRecord();
}

async function startRecord() {
    const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
    mediaRecorder = new MediaRecorder(stream);
    chunks = [];

    mediaRecorder.ondataavailable = (e) => chunks.push(e.data);
    mediaRecorder.onstop = () => {
        const blob = new Blob(chunks, { type: 'audio/webm' });
        const file = new File([blob], 'recording.webm', { type: blob.type });
        audioFile.value = file;
        audioUrl.value = URL.createObjectURL(blob);
        loadAudio();
        emit('update:modelValue', file);
    };

    mediaRecorder.start();
    isRecording.value = true;

    elapsedTime.value = 0;
    const timer = setInterval(() => {
        if (!isRecording.value) return clearInterval(timer);
        elapsedTime.value++;
    }, 1000);
}

function stopRecord() {
    mediaRecorder?.stop();
    mediaRecorder = null;
    isRecording.value = false;
}

// --- Audio Player functions ---
function loadAudio() {
    const el = audioRef.value;
    if (!el || !audioUrl.value) return;

    el.src = audioUrl.value;
    el.load();
    el.onloadedmetadata = () => (duration.value = el.duration);
    el.ontimeupdate = () => (current.value = el.currentTime);
    el.onplay = () => (isPlaying.value = true);
    el.onpause = () => (isPlaying.value = false);
    el.onended = () => (isPlaying.value = false);
}

function togglePlay() {
    const el = audioRef.value;
    if (!el) return;
    isPlaying.value ? el.pause() : el.play();
}

// --- Delete audio ---
function handleDelete(emitChange = true) {
    const el = audioRef.value;
    el?.pause();
    if (el) el.currentTime = 0;

    isPlaying.value = false;
    audioFile.value = null;
    audioUrl.value = null;
    elapsedTime.value = 0;

    if (emitChange) emit('update:modelValue', null);
}

onMounted(() => {
    if (audioFile.value && audioUrl.value) loadAudio();
});

onBeforeUnmount(() => {
    handleDelete(false);
});
</script>

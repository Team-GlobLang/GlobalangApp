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
            <span class="font-mono text-lg">{{ elapsedClock }}</span>
        </div>

        <div v-else class="flex items-center justify-center gap-4">
            <FwbButton outline type="button" pill square @click="togglePlay">
                <i class="pi text-2xl p-2" :class="isPlaying ? 'pi-pause' : 'pi-play'"></i>
            </FwbButton>

            <span class="font-mono">{{ currentClock }}</span>

            <button type="button" @click="handleDelete" class="text-red-500">
                <i class="pi pi-trash text-lg"></i>
            </button>
        </div>

        <audio ref="audioRef"></audio>
        <small>Record a 1-2 minute audio speaking in a language you are fluent in and would like to
            teach.</small> <br>
        <small>Note: This can be a short introduction about yourself.</small>
    </div>
</template>

<script setup lang="ts">
import { ref, computed, watchEffect } from 'vue'
import { fileRef, audioUrl, isRecording, elapsedClock } from '../../../ShortAudio/Hooks/Recorder/state';
import { useAudioPlayer } from '../../../ShortAudio/Hooks/Recorder/useAudioPlayer';
import { useMicPermission } from '../../../ShortAudio/Hooks/Recorder/useMicPermission';
import { useResetRecording } from '../../../ShortAudio/Hooks/Recorder/useResetRecording';
import { useStartRecording } from '../../../ShortAudio/Hooks/Recorder/useStartRecording';
import { useStopRecording } from '../../../ShortAudio/Hooks/Recorder/useStopRecording';
import { FwbButton } from 'flowbite-vue';

const audioRef = ref<HTMLAudioElement | null>(null)

const props = withDefaults(defineProps<{
    errorMessage?: string
}>(), {
    errorMessage: ''
})

const emit = defineEmits<{ (e: 'update:file', file: File | null): void }>()

const { isPlaying, currentClock, toggle: togglePlay, load, stop: stopPlay } = useAudioPlayer(audioRef)
const { hasPermission, request } = useMicPermission()
const { start } = useStartRecording()
const { stop } = useStopRecording()
const { reset: resetRecording } = useResetRecording()

const audioFile = computed(() => fileRef.value)

watchEffect(() => {
    if (audioFile.value && audioUrl.value) {
        load(audioUrl.value)
        stopPlay()
        emit('update:file', audioFile.value)
    } else {
        load(null)
        emit('update:file', null)
    }
})

async function toggleRecord() {
    if (isRecording.value) await stop()
    else {
        if (!hasPermission.value) await request()
        await start()
    }
}

function handleDelete() {
    stopPlay()
    load(null)
    resetRecording()
}
</script>

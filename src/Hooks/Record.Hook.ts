import { ref, computed, onBeforeUnmount } from "vue";
import toast from "vue3-hot-toast";

export function useRecorder(maxTime = 120) {
  const audioRef = ref<HTMLAudioElement | null>(null);
  const mediaRecorder = ref<MediaRecorder | null>(null);
  const streamRef = ref<MediaStream | null>(null);
  const audioChunks = ref<Blob[]>([]);

  const isRecording = ref(false);
  const isPlaying = ref(false);
  const audioFile = ref<File | null>(null);
  const audioUrl = ref<string | null>(null);
  const elapsedTime = ref(0);
  const timerInterval = ref<number | null>(null);

  const currentClock = computed(() => toClock(elapsedTime.value));

  function toClock(sec: number) {
    const s = Math.max(0, Math.floor(sec || 0));
    const mm = String(Math.floor(s / 60)).padStart(2, "0");
    const ss = String(s % 60).padStart(2, "0");
    return `${mm}:${ss}`;
  }

  async function toggleRecord() {
    if (isRecording.value) stopRecording();
    else await startRecording();
  }

  async function startRecording() {
    if (!navigator.mediaDevices?.getUserMedia) {
      toast.error("Microphone not supported");
      return;
    }

    streamRef.value = await navigator.mediaDevices.getUserMedia({ audio: true });
    mediaRecorder.value = new MediaRecorder(streamRef.value);
    audioChunks.value = [];

    mediaRecorder.value.ondataavailable = (e) => audioChunks.value.push(e.data);
    mediaRecorder.value.onstop = () => {
      const blob = new Blob(audioChunks.value, { type: "audio/webm" });
      audioFile.value = new File([blob], "recording.webm", { type: blob.type });
      audioUrl.value = URL.createObjectURL(blob);
      toast.success("Recording stopped");

      // release mic
      if (streamRef.value) {
        streamRef.value.getTracks().forEach((track) => track.stop());
        streamRef.value = null;
      }

      loadAudio();
    };

    mediaRecorder.value.start();
    isRecording.value = true;
    elapsedTime.value = 0;
    toast.success("Recording…");

    timerInterval.value = window.setInterval(() => {
      elapsedTime.value++;
      if (elapsedTime.value >= maxTime) stopRecording();
    }, 1000);
  }

  function stopRecording() {
    if (mediaRecorder.value && mediaRecorder.value.state !== "inactive") {
      mediaRecorder.value.stop();
    }
    isRecording.value = false;
    if (timerInterval.value) clearInterval(timerInterval.value);
  }

  function loadAudio() {
    if (audioRef.value && audioUrl.value) {
      audioRef.value.src = audioUrl.value;
      audioRef.value.load();
    }
  }

  function togglePlay() {
    if (!audioRef.value) return;
    if (isPlaying.value) {
      audioRef.value.pause();
      isPlaying.value = false;
    } else {
      audioRef.value.play();
      isPlaying.value = true;
      audioRef.value.onended = () => (isPlaying.value = false);
    }
  }

  function handleDelete() {
    if (audioRef.value) {
      audioRef.value.pause();
      audioRef.value.src = "";
    }
    if (audioUrl.value) URL.revokeObjectURL(audioUrl.value);

    if (streamRef.value) {
      streamRef.value.getTracks().forEach((track) => track.stop());
      streamRef.value = null;
    }

    audioFile.value = null;
    audioUrl.value = null;
    isRecording.value = false;
    isPlaying.value = false;
    elapsedTime.value = 0;

    toast.error("Recording deleted");
  }

  onBeforeUnmount(() => {
    if (timerInterval.value) clearInterval(timerInterval.value);
    if (audioUrl.value) URL.revokeObjectURL(audioUrl.value);

    if (streamRef.value) {
      streamRef.value.getTracks().forEach((track) => track.stop());
      streamRef.value = null;
    }
  });

  return {
    audioRef,
    audioFile,
    audioUrl,
    isRecording,
    isPlaying,
    elapsedTime,
    currentClock,
    toggleRecord,
    togglePlay,
    handleDelete,
  };
}

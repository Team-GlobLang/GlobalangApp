import { ref, computed, watch, onBeforeUnmount, type Ref } from 'vue';

export function useAudioPlayer(audioRef: Ref<HTMLAudioElement | null>) {
  const isPlaying = ref(false);
  const duration  = ref(0);
  const current   = ref(0);

  const toClock = (sec: number) => {
    const s = Math.max(0, Math.floor(sec || 0));
    const mm = String(Math.floor(s / 60)).padStart(2, '0');
    const ss = String(s % 60).padStart(2, '0');
    return `${mm}:${ss}`;
  };

  const currentClock  = computed(() => toClock(current.value));
  const durationClock = computed(() => toClock(duration.value));

  function play()  { audioRef.value?.play(); }
  function pause() { audioRef.value?.pause(); }
  function stop()  {
    const el = audioRef.value;
    if (!el) return;
    el.pause();
    el.currentTime = 0;
    isPlaying.value = false;
  }
  function toggle() { (isPlaying.value ? pause : play)(); }

  function load(url: string | null) {
    const el = audioRef.value;
    if (!el) return;

    if (!url) {
      stop();
      el.removeAttribute('src');
      el.load();
      duration.value = 0;
      current.value = 0;
      return;
    }
    if (el.src !== url) el.src = url;
    el.load();
  }

 
  watch(
    audioRef,
    (el, _old, onInvalidate) => {
      if (!el) return;

      const onPlay   = () => { isPlaying.value = true; };
      const onPause  = () => { isPlaying.value = false; };
      const onEnded  = () => { isPlaying.value = false; };
      const onTime   = () => { current.value  = el.currentTime || 0; };
      const onLoaded = () => {
        const d = el.duration;
        duration.value = Number.isFinite(d) ? d : 0;
        current.value = el.currentTime || 0;
      };

      el.addEventListener('play', onPlay);
      el.addEventListener('pause', onPause);
      el.addEventListener('ended', onEnded);
      el.addEventListener('timeupdate', onTime);
      el.addEventListener('loadedmetadata', onLoaded);

      onInvalidate(() => {
        el.removeEventListener('play', onPlay);
        el.removeEventListener('pause', onPause);
        el.removeEventListener('ended', onEnded);
        el.removeEventListener('timeupdate', onTime);
        el.removeEventListener('loadedmetadata', onLoaded);
      });
    },
    { immediate: true }
  );

  onBeforeUnmount(() => stop());

  return { isPlaying, currentClock, durationClock, play, pause, stop, toggle, load };
}

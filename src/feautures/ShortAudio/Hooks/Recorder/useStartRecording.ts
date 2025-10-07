import { useMutation } from '@tanstack/vue-query';
import toast from 'vue3-hot-toast';
import { h } from 'vue';

import {
  isRecording, isPaused, elapsedMs, errorMsg,
  blobRef, fileRef, audioUrl, maxSeconds, maxBytes
} from './state';
import {
  supportedMime, setRecorder, resetChunks, pushChunk, buildBlob,
  setupTick, setStartTs, nowElapsed, clearTick
} from './core';
import { useMicPermission } from './useMicPermission';

export function useStartRecording() {
  const { hasPermission, request } = useMicPermission();

  async function startInternal() {
    errorMsg.value = '';
    blobRef.value = null;
    fileRef.value = null;
    if (audioUrl.value) {
      URL.revokeObjectURL(audioUrl.value);
      audioUrl.value = null;
    }

    if (!hasPermission.value) await request();

    const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
    const mt = supportedMime();
    const mr = new MediaRecorder(stream, mt ? { mimeType: mt } : undefined);
    setRecorder(mr);
    resetChunks();

    mr.ondataavailable = (ev: BlobEvent) => { if (ev.data?.size) pushChunk(ev.data); };

    mr.onstop = () => {
      clearTick();

      const b = buildBlob(mr.mimeType);
      blobRef.value = b;

      if (b.size > maxBytes) {
        errorMsg.value = `The audio exceeds  ${Math.round(maxBytes / (1024 * 1024))} MB`;
        mr.stream.getTracks().forEach(t => t.stop());
        setRecorder(null);
        isRecording.value = false;
        isPaused.value = false;
        return;
      }

      const ext = mr.mimeType.includes('ogg') ? 'ogg' : 'webm';
      const f = new File(
        [b],
        `audio-${new Date().toISOString().replace(/[:.]/g, '-')}.${ext}`,
        { type: b.type }
      );
      fileRef.value = f;
      audioUrl.value = URL.createObjectURL(b);

      mr.stream.getTracks().forEach(t => t.stop());
      setRecorder(null);
    };

    mr.start(250);
    isRecording.value = true;
    isPaused.value = false;

    setStartTs(Date.now());
    elapsedMs.value = 0;
    setupTick(() => {
      elapsedMs.value = nowElapsed();
      if (elapsedMs.value >= maxSeconds * 1000) {
        clearTick();
        try { mr.stop(); } catch {}
        isRecording.value = false;
        isPaused.value = false;
      }
    });

    return 'Recording…';
  }

  const mutation = useMutation({
    mutationFn: async () =>
      toast.promise(startInternal(), {
        loading: 'Starting recording…',
        success: () => h('span', 'Recording…'),
        error: (e: any) => h('span', e?.message ?? 'Could not start recording'),
      }),
  });

  const start = () => mutation.mutateAsync();

  return { start, ...mutation };
}

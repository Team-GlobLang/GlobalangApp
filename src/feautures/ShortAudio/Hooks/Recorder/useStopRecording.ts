import { useMutation } from '@tanstack/vue-query';
import toast from 'vue3-hot-toast';
import { h } from 'vue';

import { isRecording, isPaused } from './state';
import { getRecorder, clearTick } from './core';

export function useStopRecording() {
  function stopInternal(): 'Audio ready' {
    const mr = getRecorder();
    if (!mr || !isRecording.value) throw new Error('No recording in progress');

    clearTick();
    try { mr.stop(); } catch {}

    isRecording.value = false;
    isPaused.value = false;

    return 'Audio ready';
  }

  const mutation = useMutation({
    mutationFn: async () =>
      toast.promise(Promise.resolve(stopInternal()), {
        loading: 'Finalizing…',
        success: (msg: string) => h('span', msg),
        error: (e: any) => h('span', e?.message ?? 'Unable to finalize recording'),
      }),
  });

  const stop = () => mutation.mutateAsync();

  return { stop, ...mutation };
}

import { useMutation } from '@tanstack/vue-query';
import toast from 'vue3-hot-toast';
import { h } from 'vue';

import { isRecording, isPaused, elapsedMs } from './state';
import { getRecorder, clearTick, setupTick, setStartTs } from './core';

export function usePauseResume() {
  function toggleInternal(): 'Paused' | 'Resumed'  {
    const mr = getRecorder();
    if (!mr || !isRecording.value) throw new Error('No recording in progress');

    if (isPaused.value) {
      mr.resume();
      isPaused.value = false;
      setStartTs(Date.now() - elapsedMs.value);
      setupTick(() => { });
      return 'Resumed';
    } else {
      mr.pause();
      isPaused.value = true;
      clearTick();
      return 'Paused';
    }
  }

  const mutation = useMutation({
    mutationFn: async () =>
      toast.promise(Promise.resolve(toggleInternal()), {
        loading: 'Updating…',
        success: (msg: 'Paused' | 'Resumed') => h('span', msg),
        error: (e: any) => h('span', e?.message ?? 'Unable to change state'),
      }),
  });

  const toggle = () => mutation.mutateAsync();

  return { toggle, ...mutation };
}

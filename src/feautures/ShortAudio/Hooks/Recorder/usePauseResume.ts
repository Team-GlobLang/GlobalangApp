import { useMutation } from '@tanstack/vue-query';
import toast from 'vue3-hot-toast';
import { h } from 'vue';

import { isRecording, isPaused, elapsedMs } from './state';
import { getRecorder, clearTick, setupTick, setStartTs } from './core';

export function usePauseResume() {
  function toggleInternal(): 'Pausado' | 'Reanudado' {
    const mr = getRecorder();
    if (!mr || !isRecording.value) throw new Error('No hay grabación en curso');

    if (isPaused.value) {
      mr.resume();
      isPaused.value = false;
      setStartTs(Date.now() - elapsedMs.value);
      setupTick(() => { });
      return 'Reanudado';
    } else {
      mr.pause();
      isPaused.value = true;
      clearTick();
      return 'Pausado';
    }
  }

  const mutation = useMutation({
    mutationFn: async () =>
      toast.promise(Promise.resolve(toggleInternal()), {
        loading: 'Actualizando…',
        success: (msg: 'Pausado' | 'Reanudado') => h('span', msg),
        error: (e: any) => h('span', e?.message ?? 'No se pudo cambiar el estado'),
      }),
  });

  const toggle = () => mutation.mutateAsync();

  return { toggle, ...mutation };
}

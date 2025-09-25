import { useMutation } from '@tanstack/vue-query';
import toast from 'vue3-hot-toast';
import { h } from 'vue';

import { isRecording, isPaused } from './state';
import { getRecorder, clearTick } from './core';

export function useStopRecording() {
  function stopInternal(): 'Audio listo' {
    const mr = getRecorder();
    if (!mr || !isRecording.value) throw new Error('No hay grabación en curso');

    clearTick();
    try { mr.stop(); } catch {}

    isRecording.value = false;
    isPaused.value = false;

    return 'Audio listo';
  }

  const mutation = useMutation({
    mutationFn: async () =>
      toast.promise(Promise.resolve(stopInternal()), {
        loading: 'Finalizando…',
        success: (msg: string) => h('span', msg),
        error: (e: any) => h('span', e?.message ?? 'No se pudo finalizar'),
      }),
  });

  const stop = () => mutation.mutateAsync();

  return { stop, ...mutation };
}

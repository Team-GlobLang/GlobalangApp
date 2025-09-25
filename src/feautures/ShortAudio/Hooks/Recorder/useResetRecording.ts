import { useMutation } from '@tanstack/vue-query';
import toast from 'vue3-hot-toast';
import { h } from 'vue';

import {
  blobRef, fileRef, audioUrl, errorMsg, elapsedMs, isRecording, isPaused
} from './state';
import { getRecorder, clearTick } from './core';

export function useResetRecording() {
  function resetInternal(): 'Reiniciado' {
    clearTick();
    const mr = getRecorder();
    try { mr?.stop(); } catch {}
    mr?.stream?.getTracks().forEach(t => t.stop());

    isRecording.value = false;
    isPaused.value = false;
    errorMsg.value = '';
    elapsedMs.value = 0;
    blobRef.value = null;
    fileRef.value = null;

    if (audioUrl.value) {
      URL.revokeObjectURL(audioUrl.value);
      audioUrl.value = null;
    }
    return 'Reiniciado';
  }

  const mutation = useMutation({
    mutationFn: async () =>
      toast.promise(Promise.resolve(resetInternal()), {
        loading: 'Limpiando…',
        success: (m: string) => h('span', m),
        error: (e: any) => h('span', e?.message ?? 'No se pudo reiniciar'),
      }),
  });


  const reset = () => mutation.mutateAsync();

  const { reset: resetMutation, ...rest } = mutation;

  return {
    reset,     
    resetMutation,  
    ...rest,       
  };
}

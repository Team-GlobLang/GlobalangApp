import { useMutation } from '@tanstack/vue-query'
import toast from 'vue3-hot-toast'
import type { ApiError } from '../../../Core/types/ApiError'
import { getShorts } from '../Services/shortService'
import type { AudioItem } from '../Interfaces/short'
import { h } from 'vue'

export const useAudios = () => {
  return useMutation<AudioItem[], ApiError, void>({
    mutationFn: () =>
      toast.promise(getShorts(), {
        loading: 'Loading audios...',
        success: (data: AudioItem[]) =>
          h('span', `✅ ${data.length} audios loaded`),
        error: (err: ApiError) =>
          h('span', `❌ ${err.message}`),
      }),
  })
}
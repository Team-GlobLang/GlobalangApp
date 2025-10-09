import { useMutation } from '@tanstack/vue-query'
import toast from 'vue3-hot-toast'
import { h } from 'vue'
import type { ApiError } from '../../../Core/types/ApiError'
import { addShortsToFavorites } from '../Services/shortService'

export const useAddFavorite = () => {
  const mutation = useMutation({
    mutationFn: (ids: string[]) =>
      toast.promise(addShortsToFavorites(ids), {
        loading: 'Please wait...',
        success: 'Added to favorites!',
        error: (error: ApiError) => h('span', `${error.message ?? 'Failed to add favorite'}`),
      }),
  })

  return mutation
}

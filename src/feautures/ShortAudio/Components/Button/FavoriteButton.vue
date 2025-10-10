<template>
  <FwbButton
    class="h-10 rounded-full px-4 font-semibold"
    :disabled="fav.isPending.value || ids.length === 0"
    @click="submit"
  >
    <i class="pi pi-heart mr-2"></i>
    Add {{ ids.length }} to favorites
  </FwbButton>
</template>

<script setup lang="ts">
import { FwbButton } from 'flowbite-vue'
import { computed } from 'vue'
import { useAddFavorite } from '../../Hooks/useAddFavorite';
const props = defineProps<{ selectedIds: string[] }>()
const emit = defineEmits<{ (e: 'done'): void }>()

const fav = useAddFavorite()
const ids = computed(() => Array.from(new Set(props.selectedIds || [])))

function submit() {
  if (!ids.value.length || fav.isPending.value) return
  fav.mutate(ids.value, {
    onSuccess: () => emit('done'),
  })
}
</script>

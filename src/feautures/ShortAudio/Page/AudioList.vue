<template>
  <div class="min-h-screen bg-gray-50">
    <div class="w-full max-w-md mx-auto p-4 md:p-6 space-y-4">
      <BackButton> Audio list </BackButton>

      <div class="bg-white rounded-2xl shadow p-6">
      <div class="grid grid-cols-1 md:grid-cols-3 gap-6 items-stretch">

        <div class="space-y-6">
         <AudioListCard
            v-for="a in audios"
            :key="a.id"
            :src="a.src"
            :duration="a.duration"
            :title="a.title"
            :description="a.description"
            @toggle-fav="(fav: boolean) => (a.favorite = fav)"
              />
        </div>
      </div>
      </div>
     </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue'
import AudioListCard from '../Components/AudioListCard.vue'
import BackButton from '../Components/Button/BackButton.vue'
import { useAudios } from '../Hooks/useAudios'

const { mutate, data: audios } = useAudios()

onMounted(() => mutate())

function toggleFavorite(id: string | number, fav: boolean) {
  console.log('toggle fav', id, fav)
  //favoritos no lo encontre en el backend
}
</script>

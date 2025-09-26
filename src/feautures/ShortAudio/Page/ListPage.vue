<template>
  <div class="min-h-screen bg-gray-50">
    <div class="w-full max-w-md mx-auto p-4 md:p-6 space-y-4">
      <BackButton> Lista de audios </BackButton>

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
import { ref } from 'vue'
import AudioListCard from '../Components/AudioListCard.vue'
import BackButton from '../Components/Button/BackButton.vue'
type Item = {
  id: number | string
  src: string
  duration: number
  description?: string
  title: string
  favorite?: boolean
}

const audios = ref<Item[]>([
  {
    id: 1,
    src: '/audios/test1.mp3',
    duration: 60,
    title: 'Saludos',
    description: 'Audio de prueba para candidatura: saludo inicial, resumen de experiencia y cierre.',
    favorite: false,
  },
  {
    id: 2,
    src: '/audios/test2.mp3',
    duration: 45,
    title: 'La hora tica',
    description: 'Forma de decir que son muy impuntuales. «¿Quedamos a las 7 hora normal u hora tica?',
    favorite: true,
  },
  {
    id: 3,
    src: '/audios/test2.mp3',
    duration: 105,
    title: 'Me regala',
    description: 'Constarriqueñismo utilizado para decir amablemente que le vendan algo',
    favorite: true,
  },
])
</script>

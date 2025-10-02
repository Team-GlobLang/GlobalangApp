<template>
  <section class="min-h-screen bg-gray-50">
     <div class="w-full max-w-md mx-auto p-4 md:p-6 space-y-4">
      <BackButton>Favorite audios</BackButton>
    <div class="bg-white rounded-2xl shadow p-6">
        <div class="grid grid-cols-1 md:grid-cols-3 gap-6 items-stretch">
      <div
        ref="scroller"
          class="flex flex-col gap-4 overflow-y-auto max-h-[70vh] pb-2 scroll-smooth no-scrollbar"
      >
        <div
          v-for="a in favoriteItems"
          :key="a.id"
          class="min-w-[20rem] snap-start space-y-6"
        >
          <AudioListCard
            :src="a.src"
            :duration="a.duration"
            :headerTitle="a.title"
            :title="a.title"
            :description="a.description"
            :defaultFavorite="a.favorite"
            @toggle-fav="(fav: boolean) => onToggleFav(a.id, fav)"
          />
        </div>
      </div>

      <!-- cuando no hay audio -->
       <p v-if="!favoriteItems.length" class="text-sm text-gray-500 mt-2">
        You don't have any favorite audios yet. Go to the audio list and mark some as favorites to see them here.
      </p>
    </div>

    </div>
     </div>
  </section>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import AudioListCard from '../Components/AudioListCard.vue'
import BackButton from '../Components/Button/BackButton.vue'

type Item = {
  id: number | string
  src: string
  duration: number
  title: string
  description?: string
  favorite: boolean
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
    description: 'Forma de decir que son muy impuntuales. «¿Quedamos a las 7 hora normal u hora tica?»',
    favorite: true,
  },
  {
    id: 3,
    src: '/audios/test2.mp3',
    duration: 105,
    title: 'Me regala',
    description: 'Costarriqueñismo utilizado para decir amablemente que le vendan algo.',
    favorite: true,
  },
])


const favoriteItems = computed(() => audios.value.filter(a => a.favorite))

function onToggleFav(id: Item['id'], fav: boolean) {
  const it = audios.value.find(x => x.id === id)
  if (it) it.favorite = fav
}
</script>

<style scoped>
.no-scrollbar::-webkit-scrollbar { display: none; }
.no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
</style>

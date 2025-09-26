<template>
  <div class="min-h-screen bg-gray-50">
    <div class="w-full max-w-5xl mx-auto p-4 md:p-6 space-y-3">
      <BackButton class="mb-1" />

      <div class="bg-white rounded-2xl shadow p-6">
        <div class="grid grid-cols-1 md:grid-cols-3 gap-6 items-stretch">
          <div class="h-full">
            <QuizForm v-model="quizData" />
          </div>

          <div class="h-full">
            <AudioCaptureCard :persist="false" :bare="true" @use="onUse" />
          </div>

          <button
            type="button"
            class="px-4 py-2 bg-blue-500 text-white rounded-lg"
          >
             Guardar
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import AudioCaptureCard from '../Components/Recorder/AudioCaptureCard.vue'
import QuizForm from '../Components/Form/QuizForm.vue'
import BackButton from '../Components/Button/BackButton.vue'

const quizData = ref({
  title: '',
  language: '',
  country: '',
  meaning: ''
})

async function onUse(file: File) {
  console.log('Usar/subir:', file)
  console.log('Datos del quiz:', quizData.value)
}
</script>

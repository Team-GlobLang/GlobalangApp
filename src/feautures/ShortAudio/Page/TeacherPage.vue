<template>
  <div class="min-h-screen bg-gray-50">
    <div class="w-full max-w-5xl mx-auto p-4 md:p-6 space-y-3">

      <BackButton>Solicitud de profesor</BackButton>

      <div class="bg-white rounded-2xl shadow p-6">
        <div class="grid grid-cols-1 md:grid-cols-3 gap-6 items-stretch">
          <div class="h-full">
            <TeacherForm v-model="teacherData" />
          </div>

          <div class="h-full">
            <AudioCaptureCard :persist="false" :bare="true" @use="onUse" />
          </div>

          <!-- Botón para cambiar por el funcional -->
           <button
              type="button"
              class="ppx-4 py-2 bg-blue-500 text-white rounded-lg"
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
import TeacherForm from '../Components/Form/TeacherForm.vue' // 👈 cambia el import
import BackButton from '../Components/Button/BackButton.vue'

const teacherData = ref({
  language: '',
  level: ''
})

async function onUse(file: File) {
  console.log('Usar/subir:', file)
  console.log('Datos teacher:', teacherData.value)
}
</script>

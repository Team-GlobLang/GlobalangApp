<template>
  <fwb-modal
    v-if="isShowModal"
    @close="closeModal"
    position="center"
    focus-trap
  >
    <template #header>
      <div class="flex items-center text-lg">
        Try Globalang Free for 15 Days!
      </div>
    </template>
    <template #body>
      <p class="text-base leading-relaxed text-gray-500 dark:text-gray-400">
        Stop memorizing boring phrases and start living the language. Globalang
        gives you access to authentic slang, cultural tips, and fun lessons
        designed to make you think, laugh, and talk like a native.
      </p>
      <p class="text-base leading-relaxed text-gray-500 dark:text-gray-400">
        For the next 15 days, you’ll have full access totally free.
      </p>
      <p class="text-base leading-relaxed text-gray-500 dark:text-gray-400">
        Try it out, discover new expressions, and fall in love with learning
        languages again.
      </p>
      <p class="text-base leading-relaxed text-gray-500 dark:text-gray-400">
        Your journey to sounding natural starts right here.
      </p>
    </template>
    <template #footer>
      <div class="flex justify-between">
        <fwb-button @click="rejectFreeTrial" color="alternative">
          Don’t show more
        </fwb-button>
        <fwb-button @click="acceptFreeTrial" color="green">
          Start my free trial
        </fwb-button>
      </div>
    </template>
  </fwb-modal>
</template>

<script lang="ts" setup>
import { computed, ref } from "vue";
import { FwbButton, FwbModal } from "flowbite-vue";
import { userStore } from "@UserStore";

const membership = computed(() => userStore.user?.membership);

const isShowModal = ref(false);

function closeModal() {
  isShowModal.value = false;
}
function showModal() {
  isShowModal.value = true;
}

const trialResponse = localStorage.getItem("FreeTrialResponse");

if (membership.value == null && !trialResponse) {
  isShowModal.value = true;
}
///////MANEJOS DEA LA ACEPTACOIN /////

function setResponse(response: string) {
  localStorage.setItem("FreeTrialResponse", response);
}

function acceptFreeTrial() {
  setResponse("accepted");
  // LOGICA DE ENDPOINT
  closeModal();
}

function rejectFreeTrial() {
  setResponse("rejected");
  closeModal();
}
</script>

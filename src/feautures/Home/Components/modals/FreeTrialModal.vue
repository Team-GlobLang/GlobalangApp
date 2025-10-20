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
import { useStartTrial } from "../../../Auth/Hooks/useStartTrial";

const activeTrial = computed(() => userStore.user?.activeTrial);
const isShowModal = ref(false);
const mutation = useStartTrial();
const trialResponse = computed(() => userStore.getTrialResponse());

function closeModal() {
  isShowModal.value = false;
}

if (activeTrial.value == null && trialResponse.value !== "rejected") {
  isShowModal.value = true;
}

async function acceptFreeTrial() {
  try {
    await mutation.mutateAsync();
    closeModal();
  } catch (err) {
    console.error("Error to start free trial:", err);
  }
}

function rejectFreeTrial() {
  userStore.setTrialResponse("rejected");
  console.log(trialResponse);
  closeModal();
}
</script>

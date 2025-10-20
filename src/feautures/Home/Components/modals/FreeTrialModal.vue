<template>
  <Dialog
    v-model:visible="isShowModal"
    modal
    class="bg-white! w-11/12 rounded-2xl! p-5"
    dismissableMask
    :pt="{
      mask: { class: 'backdrop-brightness-70 bg-black/40' },
    }"
  >
    <template #header>
      <div class="flex items-center justify-between w-full">
        <h3 class="text-lg font-semibold text-gray-900 dark:text-white">
          Try Globalang Premiun Free for 15 Days!
        </h3>
      </div>
    </template>

    <div class="space-y-4 py-7">
      <p class="text-base leading-relaxed text-gray-500 dark:text-gray-400">
        Stop memorizing boring phrases and start living the language. Globalang
        gives you access to authentic slang, cultural tips, and fun lessons
        designed to make you think, laugh, and talk like a native.
      </p>
      <p class="text-base leading-relaxed text-gray-500 dark:text-gray-400">
        For the next 15 days, you'll have full access totally free.
      </p>
      <p class="text-base leading-relaxed text-gray-500 dark:text-gray-400">
        Try it out, discover new expressions, and fall in love with learning
        languages again.
      </p>
      <p class="text-base leading-relaxed text-gray-500 dark:text-gray-400">
        Your journey to sounding natural starts right here.
      </p>
    </div>

    <template #footer>
      <div class="flex justify-between items-center w-full">
        <FwbButton
          color="light"
          @click="rejectFreeTrial"
          class="text-gray-900 border border-gray-300 hover:bg-gray-100 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700"
        >
          Don't show more
        </FwbButton>

        <FwbButton
          color="green"
          @click="acceptFreeTrial"
          class="text-white bg-green-700 hover:bg-green-800 dark:bg-green-600 dark:hover:bg-green-700"
        >
          Start my free trial
        </FwbButton>
      </div>
    </template>
  </Dialog>
</template>

<script lang="ts" setup>
import { ref, computed, onMounted } from "vue";
import Dialog from "primevue/dialog";
import { FwbButton } from "flowbite-vue";
import { userStore } from "@UserStore";
import { useStartTrial } from "../../../Auth/Hooks/useStartTrial";

const activeTrial = computed(() => userStore.user?.activeTrial);
const isShowModal = ref(false);
const mutation = useStartTrial();
const trialResponse = computed(() => userStore.getTrialResponse());

function closeModal() {
  isShowModal.value = false;
}

function showModalOncePerSession() {
  const hasShown = sessionStorage.getItem("trialModalShown");
  if (
    !hasShown &&
    activeTrial.value == null &&
    trialResponse.value !== "rejected"
  ) {
    isShowModal.value = true;
    sessionStorage.setItem("trialModalShown", "true");
  }
}

onMounted(() => {
  showModalOncePerSession();
});

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

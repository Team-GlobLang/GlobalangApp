<template>
  <div
    v-if="isShowModal"
    class="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto overflow-x-hidden"
    @click.self="closeModal"
  >
    <!-- Backdrop -->
    <div class="fixed inset-0 backdrop-brightness-70 bg-white/20"></div>

    <div class="relative w-full max-w-2xl max-h-full p-4">
      <div class="relative bg-white rounded-lg shadow">
        <div
          class="flex items-center justify-between p-4 md:p-5 border-b rounded-t"
        >
          <h3 class="text-lg font-semibold text-gray-900 dark:text-white">
            Try Globalang Free for 15 Days!
          </h3>
          <button
            type="button"
            class="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center"
            @click="closeModal"
          >
            <svg
              class="w-3 h-3"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 14 14"
            >
              <path
                stroke="currentColor"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
              />
            </svg>
            <span class="sr-only">Close modal</span>
          </button>
        </div>

        <div class="p-4 md:p-5 space-y-4">
          <p class="text-base leading-relaxed text-gray-500 dark:text-gray-400">
            Stop memorizing boring phrases and start living the language.
            Globalang gives you access to authentic slang, cultural tips, and
            fun lessons designed to make you think, laugh, and talk like a
            native.
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

        <div
          class="flex justify-between items-center p-4 md:p-5 border-t border-gray-200 rounded-b dark:border-gray-600"
        >
          <button
            @click="rejectFreeTrial"
            type="button"
            class="text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 font-medium rounded-lg text-sm px-5 py-2.5 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700"
          >
            Don't show more
          </button>
          <button
            @click="acceptFreeTrial"
            type="button"
            class="text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
          >
            Start my free trial
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { computed, ref } from "vue";
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

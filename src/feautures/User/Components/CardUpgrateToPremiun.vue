<template>
  <div
    class="w-11/12 p-4 bg-gradient-to-r from-yellow-100 via-yellow-50 to-white border border-yellow-300 rounded-2xl shadow hover:shadow-lg transition"
  >
    <div class="flex flex-col justify-between h-full">
      <div>
        <h3 class="text-lg font-semibold text-yellow-800">
          Upgrade to Premium
        </h3>
        <p class="text-sm text-yellow-700">
          Take your learning further — get unlimited quiz retries and access to
          exclusive learning resources designed to boost your fluency faster.
        </p>
      </div>
      <FwbButton :onclick="handleGeneratePaymentSession"
        :disabled="isPending"
        color="yellow"
        class="mt-4 w-full font-medium"
      >
        Upgrade Now
      </FwbButton>
    </div>
  </div>
</template>

<script setup lang="ts">
import { FwbButton } from "flowbite-vue";
import { UseRedirectToPay } from "../Hooks/UseRedirectToPay";

const { mutate, isPending } = UseRedirectToPay();

function handleGeneratePaymentSession() {
  mutate();
}
</script>

<template>
  <fwb-button-group class="w-full">
    <div class="flex w-full justify-between gap-10">
      <fwb-button
        :class="`w-full flex gap-4 justify-center border p-2 ${props.colorReject} text-white rounded-md p-0.5`"
      >
        <span>{{ props.rejectText }}</span>
      </fwb-button>
      <fwb-button
        :class="`w-full flex gap-4 justify-center p-2 ${props.colorAccept} rounded-md text-white p-0.5`"
      >
        <span>{{ props.acceptText }}</span>
      </fwb-button>
    </div>
  </fwb-button-group>
</template>

<script setup lang="ts">
const props = defineProps({
  acceptText: {
    type: String,
  },
  colorAccept: {
    type: String,
  },
  rejectText: {
    type: String,
  },
  colorReject: {
    type: String,
  },
});
</script>

<style scoped></style>

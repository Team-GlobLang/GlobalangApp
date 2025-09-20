<template>
  <fwb-button-group>
    <div class="w-full flex justify-between gap-4">
      <fwb-button
        class="w-full flex items-center gap-4 justify-center border border-[#FF0000] rounded-md p-0.5"
        @Click="handleReject"
      >
        <i :class="`pi ${props.rejectIcon} text-[#FF0000]`"></i>
        <span>{{ props.rejectText }}</span>
      </fwb-button>
      <fwb-button
        class="w-full flex items-center gap-4 justify-center bg-[#009951] rounded-md text-white p-0.5"
        @click="handleAccept"
      >
        <i :class="`pi ${props.acceptIcon}`"></i>
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
  acceptIcon: {
    type: String,
  },
  rejectText: {
    type: String,
  },
  rejectIcon: {
    type: String,
  },
  acceptPath: {
    type: String,
  },

  id_item: {
    type: String,
    required: true,
  },
});

const emit = defineEmits<{
  accept: [itemId: string];
  reject: [itemId: string];
}>();

const handleAccept = () => {
  emit("accept", props.id_item);
};

const handleReject = () => {
  emit("reject", props.id_item);
};
</script>

<style scoped></style>

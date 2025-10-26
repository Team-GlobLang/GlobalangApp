<template>
  <Dialog
    v-model:visible="isVisible"
    modal
    :closable="false"
    class="w-11/12 bg-white! p-6 rounded-2xl!"
    @hide="emit('update:open', false)"
    dismissableMask
    :pt="{
      mask: { class: 'backdrop-brightness-70 bg-black/40' },
    }"
  >
    <template #header>
      <div class="flex items-center space-x-2">
        <i class="pi pi-question-circle text-blue-500 text-xl"></i>
        <span class="font-semibold text-lg">
          Do you really want to retry this quiz?
        </span>
      </div>
    </template>

    <div class="text-gray-700">
      If you restart now, your current attempt won’t be counted in your
      statistics.
    </div>

    <template #footer>
      <div class="flex justify-end gap-6">
          <Button
            label="Retry"
            icon="pi pi-refresh"
            class="p-button-primary"
            @click="onRetry"
          />
        <Button
          label="Exit"
          class="p-button-text"
          icon="pi pi-times"
          @click="onExit"
        />
      </div>
    </template>
  </Dialog>
</template>

<script setup>
import { ref, watch } from "vue";
import Button from "primevue/button";
import Dialog from "primevue/dialog";

const props = defineProps({
  open: Boolean,
});

const emit = defineEmits(["update:open", "onRetry", "onExit"]);

const isVisible = ref(props.open);
watch(
  () => props.open,
  (value) => (isVisible.value = value)
);

const onExit = () => {
  emit("onExit");
  emit("update:open", false);
};

const onRetry = () => {
  emit("onRetry");
  emit("update:open", false);
};
</script>

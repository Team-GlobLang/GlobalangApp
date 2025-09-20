<template>
  <div class="grid grid-cols-2 w-full">
    <span class="text-left">Nombre completo:</span>
    <span class="text-left">{{ props.name }}</span>
  </div>
  <div class="grid grid-cols-2 w-full">
    <span class="text-left">Email:</span>
    <span class="text-left">{{ props.email }}</span>
  </div>
  <div class="grid grid-cols-2 w-full">
    <span class="text-left">idiomas que domina:</span>
    <span class="text-left">{{ props.Languages }}</span>
  </div>
  <div class="grid grid-cols-2 w-full">
    <span class="text-left">Mensaje Extra:</span>
    <p class="text-left">
      {{ props.message }}
    </p>
  </div>
  <div class="grid grid-cols-2 w-full">
    <span>Títulos acdémicos:</span>
    <span>{{ props.title }}</span>
  </div>
  <p>imagen</p>
  <Btn_Group_Without_Icon
    accept-text="Aprobar"
    reject-text="Rechazar"
    color-accept="bg-[#00A1FF]"
    color-reject="bg-[#900B09]"
    :id_item="props.id_item || ''"
    @accept="onAccept"
    @reject="onReject"
  />
</template>

<script setup lang="ts">
import Btn_Group_Without_Icon from "../components/Btn_Group_Without_Icon.vue";
const props = defineProps({
  id_item: {
    type: String,
  },
  name: {
    type: String,
  },
  email: {
    type: String,
  },
  Languages: {
    type: String,
  },
  message: {
    type: String,
  },
  title: {
    type: String,
  },
});
const emit = defineEmits<{
  accept: [itemId: string];
  reject: [itemId: string];
}>();

const onAccept = (itemId: string) => {
  emit("accept", itemId);
};

const onReject = (itemId: string) => {
  emit("reject", itemId);
};
</script>

<style scoped></style>

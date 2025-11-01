<template>
  <div
    class="w-full bg-white rounded-2xl p-4 flex gap-3 hover:shadow-md transition"
  >

    <div class="flex-1 text-gray-600 text-sm flex flex-col gap-0.5">
<<<<<<< HEAD
        <h3
          class="font-semibold text-gray-800 text-base line-clamp-2 text-ellipsis overflow-hidden"
        >
          {{ text }}
        </h3>
=======
      <h3 class="font-semibold text-gray-800 text-base line-clamp-2 text-ellipsis overflow-hidden">
        {{ text }}
      </h3>
>>>>>>> 2f576dd6d2241288a9115e99680fd62810db755d
      <p v-if="country">From {{ country }}</p>
      <p v-if="createBy">By: {{ createBy }}</p>
      <p v-if="description" class="line-clamp-2">{{ description }}</p>
      <p class="text-black">{{ durationLabel }}</p>

      <p v-if="approved === false && reviewComment" class="text-red-600 italic">
        Reason: {{ reviewComment }}
      </p>
    </div>

    <div class="flex flex-col gap-2 flex-shrink-0 w-fit justify-between">
      <FwbBadge :type="badgeType">{{ approvalText }}</FwbBadge>
      <FwbButton color="red" outline @click="handleRemove(id)">
        <span v-if="isPending">Removing...</span>
        <span v-else>Remove</span>
      </FwbButton>
    </div>

  </div>
</template>

<script setup lang="ts">
import { ref, computed } from "vue";
import { FwbBadge, FwbButton } from "flowbite-vue";
import type { MyShortsInterface } from "../../Interfaces/Shorts.interface";
import { useRemoveMyShort } from "../../Hooks/UseRemoveMyShort";

const props = defineProps<MyShortsInterface>();

const duration = ref(0);

const durationLabel = computed(() => {
  if (!duration.value) return "--:--";
  const m = Math.floor(duration.value / 60);
  const s = duration.value % 60;
  return `${m}:${s.toString().padStart(2, "0")}`;
});

const badgeType = computed(() => {
  if (props.approved === null) return "yellow";
  if (props.approved === false) return "red";
  return "green";
});

const approvalText = computed(() => {
  if (props.approved === null) return "Pending";
  if (props.approved === false) return "Rejected";
  return "Approved";
});

const reviewComment = computed(() => props.reviewComment || "");

const emit = defineEmits<{
  (e: "refresh"): void;
}>();

const { mutate, isPending } = useRemoveMyShort();

const handleRemove = (id: string) => {
  mutate(id, {
    onSuccess: () => emit("refresh"),
  });
};
</script>

<style scoped>
.line-clamp-2 {
  display: -webkit-box;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
</style>

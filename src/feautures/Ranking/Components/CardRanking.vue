<template>
  <div
    :key="props.userName"
    class="w-full flex justify-between items-center mb-2 p-3 rounded-xl shadow-sm hover:shadow-md transition-shadow bg-gray-50"
  >
    <div class="flex items-center gap-3">
      <span class="text-lg">
        {{ props.position > 3 ? props.position : getMedal(props.position) }}
      </span>
      <span class="font-medium">{{ props.userName }}</span>
    </div>
    <div class="text-right">
      <div class="text-sm text-gray-500">{{ props.totalRecords }} quizzes</div>
      <div class="font-bold text-blue-600">{{ props.totalPoints }} pts</div>
    </div>
  </div>
</template>

<script setup lang="ts">
const props = defineProps({
  country: {
    type: String,
  },
  userName: {
    type: String,
  },
  position: {
    type: Number,
    required: true,
  },
  totalRecords: {
    type: Number,
  },
  totalPoints: {
    type: Number,
  },
});

function getMedal(index: number): string {
  switch (index) {
    case 1:
      return "🥇";
    case 2:
      return "🥈";
    case 3:
      return "🥉";
    default:
      return "";
  }
}
</script>

<template>
  <fwb-breadcrumb>
    <fwb-breadcrumb-item
      v-for="(item, index) in breadcrumbItems"
      :key="index"
      :home="item.isHome"
      @click="handleBreadcrumbClick(item)"
    >
      {{ item.label }}
    </fwb-breadcrumb-item>
  </fwb-breadcrumb>
</template>

<script setup lang="ts">
import { computed } from "vue";
import { useRouter } from "vue-router";
import { FwbBreadcrumb, FwbBreadcrumbItem } from "flowbite-vue";

interface BreadcrumbItem {
  label: string;
  route?: string;
  isHome?: boolean;
}

const props = defineProps<{
  items: BreadcrumbItem[];
}>();

const router = useRouter();

const breadcrumbItems = computed(() => props.items);

const handleBreadcrumbClick = (item: BreadcrumbItem) => {
  if (item.route) {
    router.push(item.route);
  }
};
</script>

<style scoped></style>

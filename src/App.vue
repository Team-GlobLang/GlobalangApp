<script setup lang="ts">
import { Toaster } from "vue3-hot-toast";
import { useRoute } from "vue-router";
import { computed } from "vue";
import NavBarLayout from "./layouts/NavBarLayout.vue";
const route = useRoute()
const showBottomBar = computed(() => route.meta.showBottomBar !== false)

</script>

<template>
  <Toaster />

  <router-view v-slot="{ Component }">
    <Transition>
      <div :class="{ 'pb-14': showBottomBar }">
        <component :is="Component" />
      </div>
    </Transition>
  </router-view>
  <NavBarLayout v-if="showBottomBar" />
</template>

<style lang="css">
.page-enter-active,
.page-leave-active {
  transition: transform 0.6s ease, opacity 0.6s ease;
  transform-origin: top left;
}

.page-enter-from {
  transform: rotateY(-45deg) rotateX(5deg);
  opacity: 0;
}

.page-leave-to {
  transform: rotateY(45deg) rotateX(-5deg);
  opacity: 0;
}
</style>

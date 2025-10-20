<script setup lang="ts">
import { Toaster } from "vue3-hot-toast";
import { useRoute, useRouter } from "vue-router";
import { computed } from "vue";
import NavBarLayout from "@layouts/NavBarLayout.vue";
const route = useRoute();
const router = useRouter();
const showBottomBar = computed(() => route.meta.showBottomBar !== false);
import { Capacitor } from "@capacitor/core";
import { App as CapacitorApp } from "@capacitor/app";

const isNative = Capacitor.isNativePlatform();

const containerPadingop = computed(() => (isNative ? "pt-[5dvh]" : "pt-0"));

CapacitorApp.addListener("appUrlOpen", (data) => {
  console.log("Redirect URL:", data.url);
  if (data.url.includes("globl://success")) {
    router.replace({ name: "SuccesPay" });
  } else if (data.url.includes("globl://cancel")) {
    router.replace({ name: "ErrorPay" });
  }
});
</script>

<template>
  <Toaster
    :toast-options="{
      style: {
        marginTop: isNative ? '5dvh' : '',
      },
    }"
  />
  <div v-if="isNative" class="bg-[#193cb8] w-full h-[5dvh] fixed z-50"></div>
  <router-view v-slot="{ Component }">
    <Transition>
      <div :class="[{ 'pb-14': showBottomBar }, containerPadingop]">
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

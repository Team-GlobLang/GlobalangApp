<template>
  <div
    :class="containerHeight"
    class="w-full flex items-center justify-center bg-gradient-to-b from-blue-50 to-white"
  >
    <div
      class="flex flex-col items-center justify-center w-11/12 max-w-md px-6 py-10 gap-8 bg-white rounded-xl shadow-lg"
    >
      <img src="/Glob.png" alt="globIcon" class="h-24 w-auto mb-2" />
      <h1 class="text-2xl font-bold text-blue-700 text-center">
        Welcome to Globalang
      </h1>
      <p class="text-gray-600 text-center">
        Connect with the world, one word at a time
      </p>
      <FwbButton @click="handleStart" class="w-full md:w-2/3 py-2 text-lg">
        Start
      </FwbButton>
      <button
        @click="router.push('/register')"
        class="text-blue-600 text-sm text-center hover:underline w-full mt-2"
      >
        Don't have an account? Sign up
      </button>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { FwbButton } from "flowbite-vue";
import { Capacitor } from "@capacitor/core";
import { computed } from "vue";
import { useRouter } from "vue-router";
import { UseSingInWithToken } from "../Hooks/useSingInWhitToken";

const router = useRouter();
const isNative = Capacitor.isNativePlatform();

const containerHeight = computed(() =>
  isNative ? "min-h-[95dvh]" : "min-h-screen"
);
const { mutate } = UseSingInWithToken();

const handleStart = () => {
  const rememberMe = localStorage.getItem("rememberMe") === "true";
  const token =
    localStorage.getItem("accessToken") ||
    (rememberMe ? null : localStorage.getItem("accessToken"));

  if (!token || !rememberMe) {
    router.push("/login");
    return;
  }

  mutate(undefined, {
    onSuccess: () => {
      router.push({ name: "Home" });
    },
    onError: (error: unknown) => {
      console.error(error);
      localStorage.removeItem("accessToken");
      sessionStorage.removeItem("accessToken");
      router.push("/login");
    },
  });
};
</script>

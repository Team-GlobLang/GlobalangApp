<template>
  <div
    class="min-h-dvh w-full bg-gradient-to-br from-emerald-50 via-white to-green-50 p-4 flex items-center justify-center"
  >
    <div
      class="flex flex-col gap-8 items-center justify-center max-w-2xl w-full"
    >
      <div class="relative">
        <div
          class="absolute inset-0 bg-emerald-400 rounded-full blur-3xl opacity-20 animate-pulse"
        ></div>
        <div
          class="relative bg-gradient-to-br from-emerald-400 to-green-500 p-8 rounded-full shadow-2xl shadow-emerald-200 animate-bounce-slow"
        >
          <i class="pi pi-check-circle text-white" style="font-size: 7rem"></i>
        </div>
      </div>

      <div
        class="w-full bg-white/80 backdrop-blur-sm shadow-2xl rounded-3xl p-8 md:p-12 border border-emerald-100 animate-fade-in"
      >
        <div class="flex flex-col gap-6 text-center">
          <h1
            class="font-bold text-4xl md:text-5xl bg-gradient-to-r from-emerald-600 to-green-600 bg-clip-text text-transparent leading-tight"
          >
            You're all set! 🎉
          </h1>

          <p class="text-gray-700 text-lg md:text-xl leading-relaxed">
            Your payment was completed successfully and your service is now
            active. Enjoy full access and start exploring everything we've
            prepared for you.
            <span class="font-semibold text-emerald-600"
              >Thanks for choosing us!</span
            >
          </p>

          <div
            class="w-24 h-1 bg-gradient-to-r from-emerald-400 to-green-400 rounded-full mx-auto my-2"
          ></div>

          <div
            class="bg-gradient-to-r from-emerald-50 to-green-50 rounded-2xl p-6 border border-emerald-200"
          >
            <p class="text-gray-600 text-lg">
              Redirecting to the home page in
              <span class="inline-block min-w-[3rem]">
                <strong
                  class="text-3xl font-bold text-emerald-600 tabular-nums"
                  >{{ countdown }}</strong
                >
              </span>
              <strong class="text-emerald-600">seconds...</strong>
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { loginWithToken } from "../../Auth/Services/AuthServices";
import { ref, onMounted } from "vue";
import { useRouter } from "vue-router";

const router = useRouter();
const countdown = ref(5);

onMounted(() => {
  const startTime = Date.now();

  const interval = setInterval(() => {
    const elapsed = Math.floor((Date.now() - startTime) / 1000);
    const remaining = 5 - elapsed;

    if (remaining <= 0) {
      clearInterval(interval);
      loginWithToken();
      router.replace({ name: "Home" });
    } else {
      countdown.value = remaining;
    }
  }, 1000);

  setTimeout(() => {
    clearInterval(interval);
    router.replace({ name: "Home" });
  }, 5000);
});
</script>

<style scoped></style>

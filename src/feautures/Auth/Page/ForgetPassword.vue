<template>
    <div
        class="w-full min-h-screen flex items-center justify-center relative bg-gradient-to-br from-blue-100 via-white to-blue-300 overflow-hidden">
        <DecorativeBg />
        <div
            class="flex flex-col md:flex-row items-center justify-center w-full max-w-4xl px-4 py-10 gap-0 md:gap-0 bg-transparent relative z-10">
            <div
                class="flex flex-col items-center justify-center w-full md:w-2/3 max-w-md px-6 py-10 gap-8 bg-white rounded-xl shadow-lg order-2 md:order-1">
                <div class="md:hidden mb-4"><img src="/Glob.png" alt="globIcon" class="h-24 w-auto object-contain" />
                </div>
                <GenerateRecoveryCode />
                <div class="w-full flex flex-col items-center mt-4">
                    <div class="flex flex-row items-center justify-center gap-2 w-full">
                        <span class="text-gray-600 text-sm">Remembered your password?</span>
                        <RouterLink to="/login" class="text-blue-600 text-sm hover:underline">Go to Login</RouterLink>
                    </div>
                </div>
            </div>
            <div class="hidden md:flex flex-1 items-center justify-center h-full order-1 md:order-2">
                <img src="/Glob.png" alt="globIcon" class="h-80 w-auto object-contain" />
            </div>
        </div>
    </div>
</template>
<script setup lang="ts">

import { RouterLink } from 'vue-router';
import DecorativeBg from '../../../components/ui/DecorativeBg.vue';
import GenerateRecoveryCode from '../Components/RecoveryCode.vue';

</script>

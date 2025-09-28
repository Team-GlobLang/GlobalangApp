<template>
    <div class="w-full min-h-screen flex justify-center items-center bg-gradient-to-br from-white to-blue-100">
        <div class="flex flex-col md:flex-row gap-3 w-full max-w-5xl p-4 md:p-8">
            <div class="flex-1">
                <MyInfo />
                <div class="mt-3">
                    <LanguageSelector v-model:country="country" />
                </div>
            </div>
            <div class="flex-1 flex items-center justify-center">
                <WorldMap v-model:country="country" />
            </div>
            <div>
                <ColabsRedirections />
            </div>
        </div>
    </div>
</template>
<script setup lang="ts">
import { ref } from 'vue';
import LanguageSelector from '../Components/LanguageSelector.vue';
import WorldMap from '../Components/WorldMap.vue';
import MyInfo from '../Components/MyInfo.vue';
import ColabsRedirections from '../Components/ColabsRedirections.vue';

const country = ref('');


</script>

<template>
    <div class="relative w-full">
        <button @click="scrollLeft"
            class="absolute left-4 top-1/2 -translate-y-1/2 z-10 bg-white p-2 rounded-full shadow hover:bg-gray-100">
            ◀
        </button>

        <div ref="carousel" class="flex overflow-x-auto scroll-smooth gap-3">
            <ShortCard v-for="item in props.data" :country="item.country" :key="item.id" :id="item.id" :text="item.text"
                :description="item.description" :file-url="item.fileUrl" />
        </div>

        <button @click="scrollRight"
            class="absolute right-4 top-1/2 -translate-y-1/2 z-10 bg-white p-2 rounded-full shadow hover:bg-gray-100">
            ▶
        </button>
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import type { ShortInterface } from '../../Interfaces/short-interface';
import ShortCard from './shortCard.vue';

const props = defineProps<{
    data: ShortInterface[];
}>();

const carousel = ref<HTMLDivElement | null>(null);

const scrollLeft = () => {
    if (carousel.value) {
        carousel.value.scrollBy({ left: -465, behavior: 'smooth' });
    }
};

const scrollRight = () => {
    if (carousel.value) {
        carousel.value.scrollBy({ left: 465, behavior: 'smooth' });
    }
};
</script>

<style scoped>
div::-webkit-scrollbar {
    display: none;
}
</style>

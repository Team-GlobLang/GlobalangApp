<template>
    <FwbButton v-show="show" @click="scrollToTop" pill
        class="fixed bottom-18 right-3 w-12 h-12  shadow-lg flex items-center justify-center transition text-xl">
        <i class=" pi pi-arrow-circle-up"></i>
    </FwbButton>
</template>

<script setup lang="ts">
import { FwbButton } from 'flowbite-vue';
import { ref, onMounted, onUnmounted } from 'vue';

const show = ref(false);

const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
};

const onScroll = () => {
    show.value = window.scrollY > 300;
};

onMounted(() => {
    window.addEventListener('scroll', onScroll);
});

onUnmounted(() => {
    window.removeEventListener('scroll', onScroll);
});
</script>
